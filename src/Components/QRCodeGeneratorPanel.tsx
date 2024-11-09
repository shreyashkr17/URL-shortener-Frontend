// Import necessary modules
import React, { useEffect, useRef } from 'react';
// Import the 'qrcode' library
import QRCode from 'qrcode';

// Define the props interface to accept a URL
interface QRCodeGeneratorProps {
  url: string;
}

// Create the functional component
const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  // Use a ref to reference the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Use the useEffect hook to generate the QR code when the component mounts or the URL changes
  useEffect(() => {
    // Ensure the canvas element exists
    if (canvasRef.current) {
      // Generate the QR code using the 'toCanvas' method of 'qrcode'
      QRCode.toCanvas(canvasRef.current, url, { width: 200, margin: 1 }, (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
        }
      });
    }
  }, [url]); // Re-run this effect whenever the URL prop changes

  // Render the canvas element in the JSX
  return (
    url && <div className='w-full h-auto flex justify-center items-center mt-4 rounded-lg'>
      {/* Canvas element where the QR code will be drawn */}
      <canvas ref={canvasRef} className='rounded-xl'></canvas>
    </div>
  );
};

// Export the component
export default QRCodeGenerator;
