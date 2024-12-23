type bit  = number;
type byte = number;
type int  = number;

function appendBits(val: int, len: int, bb: Array<bit>): void {
    if (len < 0 || len > 31 || val >>> len != 0)
        throw new RangeError("Value out of range");
    for (let i = len - 1; i >= 0; i--)  // Append bit by bit
        bb.push((val >>> i) & 1);
}

function getBit(x: int, i: int): boolean {
    return ((x >>> i) & 1) != 0;
}

function assert(cond: boolean): void {
    if (!cond)
        throw new Error("Assertion error");
}

export class Ecc {
    public static readonly LOW      = new Ecc(0, 1);  
    public static readonly MEDIUM   = new Ecc(1, 0);  
    public static readonly QUARTILE = new Ecc(2, 3);  
    public static readonly HIGH     = new Ecc(3, 2);  
    
    private constructor(
        public readonly ordinal: int,
        public readonly formatBits: int) {}
}

export class Mode {
		
    public static readonly NUMERIC      = new Mode(0x1, [10, 12, 14]);
    public static readonly ALPHANUMERIC = new Mode(0x2, [ 9, 11, 13]);
    public static readonly BYTE         = new Mode(0x4, [ 8, 16, 16]);
    public static readonly KANJI        = new Mode(0x8, [ 8, 10, 12]);
    public static readonly ECI          = new Mode(0x7, [ 0,  0,  0]);
    
    private constructor(
        public readonly modeBits: int,
        private readonly numBitsCharCount: [int,int,int]) {}
    
    
    public numCharCountBits(ver: int): int {
        return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
    }
    
}

export class QrSegment {
    public static makeBytes(data: Readonly<Array<byte>>): QrSegment {
        let bb: Array<bit> = []
        for (const b of data)
            appendBits(b, 8, bb);
        return new QrSegment(Mode.BYTE, data.length, bb);
    }
    
    public static makeNumeric(digits: string): QrSegment {
        if (!QrSegment.isNumeric(digits))
            throw new RangeError("String contains non-numeric characters");
        let bb: Array<bit> = []
        for (let i = 0; i < digits.length; ) {  // Consume up to 3 digits per iteration
            const n: int = Math.min(digits.length - i, 3);
            appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
            i += n;
        }
        return new QrSegment(Mode.NUMERIC, digits.length, bb);
    }
    public static makeAlphanumeric(text: string): QrSegment {
        if (!QrSegment.isAlphanumeric(text))
            throw new RangeError("String contains unencodable characters in alphanumeric mode");
        let bb: Array<bit> = []
        let i: int;
        for (i = 0; i + 2 <= text.length; i += 2) {  // Process groups of 2
            let temp: int = QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
            temp += QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
            appendBits(temp, 11, bb);
        }
        if (i < text.length)  // 1 character remaining
            appendBits(QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
        return new QrSegment(Mode.ALPHANUMERIC, text.length, bb);
    }
    public static makeSegments(text: string): Array<QrSegment> {
        // Select the most efficient segment encoding automatically
        if (text == "")
            return [];
        else if (QrSegment.isNumeric(text))
            return [QrSegment.makeNumeric(text)];
        else if (QrSegment.isAlphanumeric(text))
            return [QrSegment.makeAlphanumeric(text)];
        else
            return [QrSegment.makeBytes(QrSegment.toUtf8ByteArray(text))];
    }
    
    public static makeEci(assignVal: int): QrSegment {
        let bb: Array<bit> = []
        if (assignVal < 0)
            throw new RangeError("ECI assignment value out of range");
        else if (assignVal < (1 << 7))
            appendBits(assignVal, 8, bb);
        else if (assignVal < (1 << 14)) {
            appendBits(0b10, 2, bb);
            appendBits(assignVal, 14, bb);
        } else if (assignVal < 1000000) {
            appendBits(0b110, 3, bb);
            appendBits(assignVal, 21, bb);
        } else
            throw new RangeError("ECI assignment value out of range");
        return new QrSegment(Mode.ECI, 0, bb);
    }
    
    public static isNumeric(text: string): boolean {
        return QrSegment.NUMERIC_REGEX.test(text);
    }
    
    public static isAlphanumeric(text: string): boolean {
        return QrSegment.ALPHANUMERIC_REGEX.test(text);
    }
    
    public constructor(
            // The mode indicator of this segment.
            public readonly mode: Mode,
            
            public readonly numChars: int,
            
            // The data bits of this segment. Accessed through getData().
            private readonly bitData: Array<bit>) {
        
        if (numChars < 0)
            throw new RangeError("Invalid argument");
        this.bitData = bitData.slice();  // Make defensive copy
    }
    
    public getData(): Array<bit> {
        return this.bitData.slice();  // Make defensive copy
    }
    
    public static getTotalBits(segs: Readonly<Array<QrSegment>>, version: int): number {
        let result: number = 0;
        for (const seg of segs) {
            const ccbits: int = seg.mode.numCharCountBits(version);
            if (seg.numChars >= (1 << ccbits))
                return Infinity;  // The segment's length doesn't fit the field's bit width
            result += 4 + ccbits + seg.bitData.length;
        }
        return result;
    }
    private static toUtf8ByteArray(str: string): Array<byte> {
        str = encodeURI(str);
        let result: Array<byte> = [];
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) != "%")
                result.push(str.charCodeAt(i));
            else {
                result.push(parseInt(str.substring(i + 1, i + 3), 16));
                i += 2;
            }
        }
        return result;
    }
    private static readonly NUMERIC_REGEX: RegExp = /^[0-9]*$/;
    private static readonly ALPHANUMERIC_REGEX: RegExp = /^[A-Z0-9 $%*+.\/:-]*$/;
    private static readonly ALPHANUMERIC_CHARSET: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
}


export class QrCode{
    public readonly size: int;
	public readonly mask: int;
    private readonly modules   : Array<Array<boolean>> = [];
    private readonly isFunction: Array<Array<boolean>> = [];

    public constructor(public readonly version: int,public readonly errorCorrectionLevel: Ecc,dataCodewords: Readonly<Array<byte>>,msk: int) {
        if (version < QrCode.MIN_VERSION || version > QrCode.MAX_VERSION)
            throw new RangeError("Version value out of range");
        if (msk < -1 || msk > 7)
            throw new RangeError("Mask value out of range");
        this.size = version * 4 + 17;
        
        // Initialize both grids to be size*size arrays of Boolean false
        let row: Array<boolean> = [];
        for (let i = 0; i < this.size; i++)
            row.push(false);
        for (let i = 0; i < this.size; i++) {
            this.modules   .push(row.slice());  // Initially all light
            this.isFunction.push(row.slice());
        }
        
        this.drawFunctionPatterns();
        const allCodewords: Array<byte> = this.addEccAndInterleave(dataCodewords);
        this.drawCodewords(allCodewords);
        
        // Do masking
        if (msk == -1) {  // Automatically choose best mask
            let minPenalty: int = 1000000000;
            for (let i = 0; i < 8; i++) {
                this.applyMask(i);
                this.drawFormatBits(i);
                const penalty: int = this.getPenaltyScore();
                if (penalty < minPenalty) {
                    msk = i;
                    minPenalty = penalty;
                }
                this.applyMask(i);  // Undoes the mask due to XOR
            }
        }
        assert(0 <= msk && msk <= 7);
        this.mask = msk;
        this.applyMask(msk);  // Apply the final choice of mask
        this.drawFormatBits(msk);  // Overwrite old format bits
        
        this.isFunction = [];
    }

    private setFunctionModule(x: int, y: int, isDark: boolean): void {
        this.modules[y][x] = isDark;
        this.isFunction[y][x] = true;
    }

    private finderPenaltyAddHistory(currentRunLength: int, runHistory: Array<int>): void {
        if (runHistory[0] == 0)
            currentRunLength += this.size;  // Add light border to initial run
        runHistory.pop();
        runHistory.unshift(currentRunLength);
    }

    private finderPenaltyCountPatterns(runHistory: Readonly<Array<int>>): int {
        const n: int = runHistory[1];
        assert(n <= this.size * 3);
        const core: boolean = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
        return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0)
             + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
    }

    private finderPenaltyTerminateAndCount(currentRunColor: boolean, currentRunLength: int, runHistory: Array<int>): int {
        if (currentRunColor) {  // Terminate dark run
            this.finderPenaltyAddHistory(currentRunLength, runHistory);
            currentRunLength = 0;
        }
        currentRunLength += this.size;  // Add light border to final run
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        return this.finderPenaltyCountPatterns(runHistory);
    }

    private getPenaltyScore(): int {
        let result: int = 0;
        
        // Adjacent modules in row having same color, and finder-like patterns
        for (let y = 0; y < this.size; y++) {
            let runColor = false;
            let runX = 0;
            let runHistory = [0,0,0,0,0,0,0];
            for (let x = 0; x < this.size; x++) {
                if (this.modules[y][x] == runColor) {
                    runX++;
                    if (runX == 5)
                        result += QrCode.PENALTY_N1;
                    else if (runX > 5)
                        result++;
                } else {
                    this.finderPenaltyAddHistory(runX, runHistory);
                    if (!runColor)
                        result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY_N3;
                    runColor = this.modules[y][x];
                    runX = 1;
                }
            }
            result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * QrCode.PENALTY_N3;
        }
        for (let x = 0; x < this.size; x++) {
            let runColor = false;
            let runY = 0;
            let runHistory = [0,0,0,0,0,0,0];
            for (let y = 0; y < this.size; y++) {
                if (this.modules[y][x] == runColor) {
                    runY++;
                    if (runY == 5)
                        result += QrCode.PENALTY_N1;
                    else if (runY > 5)
                        result++;
                } else {
                    this.finderPenaltyAddHistory(runY, runHistory);
                    if (!runColor)
                        result += this.finderPenaltyCountPatterns(runHistory) * QrCode.PENALTY_N3;
                    runColor = this.modules[y][x];
                    runY = 1;
                }
            }
            result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * QrCode.PENALTY_N3;
        }
        
        for (let y = 0; y < this.size - 1; y++) {
            for (let x = 0; x < this.size - 1; x++) {
                const color: boolean = this.modules[y][x];
                if (  color == this.modules[y][x + 1] &&
                      color == this.modules[y + 1][x] &&
                      color == this.modules[y + 1][x + 1])
                    result += QrCode.PENALTY_N2;
            }
        }
        
        let dark: int = 0;
        for (const row of this.modules)
            dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
        const total: int = this.size * this.size;  // Note that size is odd, so dark/total != 1/2
        // Compute the smallest integer k >= 0 such that (45-5k)% <= dark/total <= (55+5k)%
        const k: int = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
        assert(0 <= k && k <= 9);
        result += k * QrCode.PENALTY_N4;
        assert(0 <= result && result <= 2568888);  // Non-tight upper bound based on default values of PENALTY_N1, ..., N4
        return result;
    }

    private drawFormatBits(mask: int): void {
        // Calculate error correction code and pack bits
        const data: int = this.errorCorrectionLevel.formatBits << 3 | mask;  // errCorrLvl is uint2, mask is uint3
        let rem: int = data;
        for (let i = 0; i < 10; i++)
            rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
        const bits = (data << 10 | rem) ^ 0x5412;  // uint15
        assert(bits >>> 15 == 0);
        
        // Draw first copy
        for (let i = 0; i <= 5; i++)
            this.setFunctionModule(8, i, getBit(bits, i));
        this.setFunctionModule(8, 7, getBit(bits, 6));
        this.setFunctionModule(8, 8, getBit(bits, 7));
        this.setFunctionModule(7, 8, getBit(bits, 8));
        for (let i = 9; i < 15; i++)
            this.setFunctionModule(14 - i, 8, getBit(bits, i));
        
        // Draw second copy
        for (let i = 0; i < 8; i++)
            this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
        for (let i = 8; i < 15; i++)
            this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
        this.setFunctionModule(8, this.size - 8, true);  // Always dark
    }

    private drawCodewords(data: Readonly<Array<byte>>): void {
        if (data.length != Math.floor(QrCode.getNumRawDataModules(this.version) / 8))
            throw new RangeError("Invalid argument");
        let i: int = 0;  // Bit index into the data
        // Do the funny zigzag scan
        for (let right = this.size - 1; right >= 1; right -= 2) {  // Index of right column in each column pair
            if (right == 6)
                right = 5;
            for (let vert = 0; vert < this.size; vert++) {  // Vertical counter
                for (let j = 0; j < 2; j++) {
                    const x: int = right - j;  // Actual x coordinate
                    const upward: boolean = ((right + 1) & 2) == 0;
                    const y: int = upward ? this.size - 1 - vert : vert;  // Actual y coordinate
                    if (!this.isFunction[y][x] && i < data.length * 8) {
                        this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
                        i++;
                    }
                    // If this QR Code has any remainder bits (0 to 7), they were assigned as
                    // 0/false/light by the constructor and are left unchanged by this method
                }
            }
        }
        assert(i == data.length * 8);
    }

    private applyMask(mask: int): void {
        if (mask < 0 || mask > 7)
            throw new RangeError("Mask value out of range");
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let invert: boolean;
                switch (mask) {
                    case 0:  invert = (x + y) % 2 == 0;                                  break;
                    case 1:  invert = y % 2 == 0;                                        break;
                    case 2:  invert = x % 3 == 0;                                        break;
                    case 3:  invert = (x + y) % 3 == 0;                                  break;
                    case 4:  invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;  break;
                    case 5:  invert = x * y % 2 + x * y % 3 == 0;                        break;
                    case 6:  invert = (x * y % 2 + x * y % 3) % 2 == 0;                  break;
                    case 7:  invert = ((x + y) % 2 + x * y % 3) % 2 == 0;                break;
                    default:  throw new Error("Unreachable");
                }
                if (!this.isFunction[y][x] && invert)
                    this.modules[y][x] = !this.modules[y][x];
            }
        }
    }

    private static reedSolomonComputeDivisor(degree: int): Array<byte> {
        if (degree < 1 || degree > 255)
            throw new RangeError("Degree out of range");
        
        let result: Array<byte> = [];
        for (let i = 0; i < degree - 1; i++)
            result.push(0);
        result.push(1);  // Start off with the monomial x^0
        
        let root = 1;
        for (let i = 0; i < degree; i++) {
            // Multiply the current product by (x - r^i)
            for (let j = 0; j < result.length; j++) {
                result[j] = QrCode.reedSolomonMultiply(result[j], root);
                if (j + 1 < result.length)
                    result[j] ^= result[j + 1];
            }
            root = QrCode.reedSolomonMultiply(root, 0x02);
        }
        return result;
    }

    private static reedSolomonMultiply(x: byte, y: byte): byte {
        if (x >>> 8 != 0 || y >>> 8 != 0)
            throw new RangeError("Byte out of range");
        // Russian peasant multiplication
        let z: int = 0;
        for (let i = 7; i >= 0; i--) {
            z = (z << 1) ^ ((z >>> 7) * 0x11D);
            z ^= ((y >>> i) & 1) * x;
        }
        assert(z >>> 8 == 0);
        return z as byte;
    }

    public getModule(x: int, y: int): boolean {
        return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
    }

    private static reedSolomonComputeRemainder(data: Readonly<Array<byte>>, divisor: Readonly<Array<byte>>): Array<byte> {
        let result: Array<byte> = divisor.map(_ => 0);
        for (const b of data) {  // Polynomial division
            const factor: byte = b ^ (result.shift() as byte);
            result.push(0);
            divisor.forEach((coef, i) =>
                result[i] ^= QrCode.reedSolomonMultiply(coef, factor));
        }
        return result;
    }
    private addEccAndInterleave(data: Readonly<Array<byte>>): Array<byte> {
        const ver: int = this.version;
        const ecl: Ecc = this.errorCorrectionLevel;
        if (data.length != QrCode.getNumDataCodewords(ver, ecl))
            throw new RangeError("Invalid argument");
        
        // Calculate parameter numbers
        const numBlocks: int = QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
        const blockEccLen: int = QrCode.ECC_CODEWORDS_PER_BLOCK  [ecl.ordinal][ver];
        const rawCodewords: int = Math.floor(QrCode.getNumRawDataModules(ver) / 8);
        const numShortBlocks: int = numBlocks - rawCodewords % numBlocks;
        const shortBlockLen: int = Math.floor(rawCodewords / numBlocks);
        
        // Split data into blocks and append ECC to each block
        let blocks: Array<Array<byte>> = [];
        const rsDiv: Array<byte> = QrCode.reedSolomonComputeDivisor(blockEccLen);
        for (let i = 0, k = 0; i < numBlocks; i++) {
            let dat: Array<byte> = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
            k += dat.length;
            const ecc: Array<byte> = QrCode.reedSolomonComputeRemainder(dat, rsDiv);
            if (i < numShortBlocks)
                dat.push(0);
            blocks.push(dat.concat(ecc));
        }
        
        // Interleave (not concatenate) the bytes from every block into a single sequence
        let result: Array<byte> = [];
        for (let i = 0; i < blocks[0].length; i++) {
            blocks.forEach((block, j) => {
                // Skip the padding byte in short blocks
                if (i != shortBlockLen - blockEccLen || j >= numShortBlocks)
                    result.push(block[i]);
            });
        }
        assert(result.length == rawCodewords);
        return result;
    }

    private drawFinderPattern(x: int, y: int): void {
        for (let dy = -4; dy <= 4; dy++) {
            for (let dx = -4; dx <= 4; dx++) {
                const dist: int = Math.max(Math.abs(dx), Math.abs(dy));  // Chebyshev/infinity norm
                const xx: int = x + dx;
                const yy: int = y + dy;
                if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size)
                    this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
            }
        }
    }

    private getAlignmentPatternPositions(): Array<int> {
        if (this.version == 1)
            return [];
        else {
            const numAlign: int = Math.floor(this.version / 7) + 2;
            const step: int = Math.floor((this.version * 8 + numAlign * 3 + 5) / (numAlign * 4 - 4)) * 2;
            let result: Array<int> = [6];
            for (let pos = this.size - 7; result.length < numAlign; pos -= step)
                result.splice(1, 0, pos);
            return result;
        }
    }

    private drawAlignmentPattern(x: int, y: int): void {
        for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++)
                this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
        }
    }

    private drawVersion(): void {
        if (this.version < 7)
            return;
        
        // Calculate error correction code and pack bits
        let rem: int = this.version;  // version is uint6, in the range [7, 40]
        for (let i = 0; i < 12; i++)
            rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
        const bits: int = this.version << 12 | rem;  // uint18
        assert(bits >>> 18 == 0);
        
        // Draw two copies
        for (let i = 0; i < 18; i++) {
            const color: boolean = getBit(bits, i);
            const a: int = this.size - 11 + i % 3;
            const b: int = Math.floor(i / 3);
            this.setFunctionModule(a, b, color);
            this.setFunctionModule(b, a, color);
        }
    }

    private drawFunctionPatterns(): void {
        // Draw horizontal and vertical timing patterns
        for (let i = 0; i < this.size; i++) {
            this.setFunctionModule(6, i, i % 2 == 0);
            this.setFunctionModule(i, 6, i % 2 == 0);
        }
        
        this.drawFinderPattern(3, 3);
        this.drawFinderPattern(this.size - 4, 3);
        this.drawFinderPattern(3, this.size - 4);
        
        // Draw numerous alignment patterns
        const alignPatPos: Array<int> = this.getAlignmentPatternPositions();
        const numAlign: int = alignPatPos.length;
        for (let i = 0; i < numAlign; i++) {
            for (let j = 0; j < numAlign; j++) {
                // Don't draw on the three finder corners
                if (!(i == 0 && j == 0 || i == 0 && j == numAlign - 1 || i == numAlign - 1 && j == 0))
                    this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
            }
        }
        
        // Draw configuration data
        this.drawFormatBits(0);  // Dummy mask value; overwritten later in the constructor
        this.drawVersion();
    }
    public static readonly MIN_VERSION: int =  1;
    public static readonly MAX_VERSION: int = 40;
		
	private static readonly PENALTY_N1: int =  3;
	private static readonly PENALTY_N2: int =  3;
	private static readonly PENALTY_N3: int = 40;
	private static readonly PENALTY_N4: int = 10;

    private static readonly ECC_CODEWORDS_PER_BLOCK: Array<Array<int>> = [
        [-1,  7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],  // Low
        [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],  // Medium
        [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],  // Quartile
        [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],  // High
    ];

    private static readonly NUM_ERROR_CORRECTION_BLOCKS: Array<Array<int>> = [
        [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4,  4,  4,  4,  4,  6,  6,  6,  6,  7,  8,  8,  9,  9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],  // Low
        [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5,  5,  8,  9,  9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],  // Medium
        [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8,  8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],  // Quartile
        [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],  // High
    ];

    private static getNumDataCodewords(ver: int, ecl: Ecc): int {
        return Math.floor(QrCode.getNumRawDataModules(ver) / 8) -
            QrCode.ECC_CODEWORDS_PER_BLOCK    [ecl.ordinal][ver] *
            QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    }
    private static getNumRawDataModules(ver: int): int {
        if (ver < QrCode.MIN_VERSION || ver > QrCode.MAX_VERSION)
            throw new RangeError("Version number out of range");
        let result: int = (16 * ver + 128) * ver + 64;
        if (ver >= 2) {
            const numAlign: int = Math.floor(ver / 7) + 2;
            result -= (25 * numAlign - 10) * numAlign - 55;
            if (ver >= 7)
                result -= 36;
        }
        assert(208 <= result && result <= 29648);
        return result;
    }


    public static encodeSegments(segs: Readonly<Array<QrSegment>>, ecl: Ecc,
            minVersion: int = 1, maxVersion: int = 40,
            mask: int = -1, boostEcl: boolean = true): QrCode {
        
        if (!(QrCode.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= QrCode.MAX_VERSION)
                || mask < -1 || mask > 7)
            throw new RangeError("Invalid value");
        
        let version: int;
        let dataUsedBits: int;
        for (version = minVersion; ; version++) {
            const dataCapacityBits: int = QrCode.getNumDataCodewords(version, ecl) * 8;  // Number of data bits available
            const usedBits: number = QrSegment.getTotalBits(segs, version);
            if (usedBits <= dataCapacityBits) {
                dataUsedBits = usedBits;
                break;  // This version number is found to be suitable
            }
            if (version >= maxVersion)  // All versions in the range could not fit the given data
                throw new RangeError("Data too long");
        }
        
        // Increase the error correction level while the data still fits in the current version number
        for (const newEcl of [Ecc.MEDIUM, Ecc.QUARTILE, Ecc.HIGH]) {  // From low to high
            if (boostEcl && dataUsedBits <= QrCode.getNumDataCodewords(version, newEcl) * 8)
                ecl = newEcl;
        }
        
        // Concatenate all segments to create the data bit string
        let bb: Array<bit> = []
        for (const seg of segs) {
            appendBits(seg.mode.modeBits, 4, bb);
            appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
            for (const b of seg.getData())
                bb.push(b);
        }
        assert(bb.length == dataUsedBits);
        
        // Add terminator and pad up to a byte if applicable
        const dataCapacityBits: int = QrCode.getNumDataCodewords(version, ecl) * 8;
        assert(bb.length <= dataCapacityBits);
        appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
        appendBits(0, (8 - bb.length % 8) % 8, bb);
        assert(bb.length % 8 == 0);
        
        // Pad with alternating bytes until data capacity is reached
        for (let padByte = 0xEC; bb.length < dataCapacityBits; padByte ^= 0xEC ^ 0x11)
            appendBits(padByte, 8, bb);
        
        // Pack bits into bytes in big endian
        let dataCodewords: Array<byte> = [];
        while (dataCodewords.length * 8 < bb.length)
            dataCodewords.push(0);
        bb.forEach((b: bit, i: int) =>
            dataCodewords[i >>> 3] |= b << (7 - (i & 7)));
        
        // Create the QR Code object
        return new QrCode(version, ecl, dataCodewords, mask);
    }
    
    public static encodeText(text: string, ecl: Ecc): QrCode {
        const segs: Array<QrSegment> = QrSegment.makeSegments(text);
        return QrCode.encodeSegments(segs, ecl);
    }

    public static encodeBinary(data: Readonly<Array<byte>>, ecl: Ecc): QrCode {
        const seg: QrSegment = QrSegment.makeBytes(data);
        return QrCode.encodeSegments([seg], ecl);
    }
}