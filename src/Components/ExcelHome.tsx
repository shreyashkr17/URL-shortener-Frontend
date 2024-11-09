import { useState, useRef } from "react";
import { Input } from "@nextui-org/input";
import JSZip from "jszip";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Checkbox,
} from "@nextui-org/react";
import { shortenBatchURLs } from "@/services/api";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface UrlColumn {
  header: string;
  columnIndex: number;
  isProcessed: boolean;
}


export default function ExcelHome({user}:any) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[][]>([]);
  const [error, setError] = useState<string>("");
  const [fileData, setFileData] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlColumns, setUrlColumns] = useState<UrlColumn[]>([]);
  const [selectedUrlColumn, setSelectedUrlColumn] = useState<UrlColumn | null>(
    null
  );
  const [batchLoader, setBatchLoader] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const apiToken =
    useSelector((state: RootState) => state.apiToken.token) ?? "";

  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileData(null);
    setHeaders([]);
    setData([]);
    setError("");
    setUrlColumns([]);
    setSelectedUrlColumn(null);
  };

  const detectUrlColumns = (headers: string[], data: any[][]) => {
    const detectedUrlColumns: UrlColumn[] = [];

    // Check each column for URLs
    headers.forEach((header, columnIndex) => {
      const hasUrls = data.some((row) => {
        const cellValue = row[columnIndex]?.toString() || "";
        return urlPattern.test(cellValue);
      });

      if (hasUrls) {
        detectedUrlColumns.push({
          header,
          columnIndex,
          isProcessed: false,
        });
      }
    });

    setUrlColumns(detectedUrlColumns);
  };

  const prepareUrlsForProcessing = (columnIndex: number) => {
    const urlsToProcess: any[] = [headers[columnIndex]]; // Add header as first element

    data.forEach((row, rowIndex) => {
      const cellValue = row[columnIndex]?.toString() || "";
      if (urlPattern.test(cellValue)) {
        urlsToProcess.push({ rowIndex, cellValue });
      }
    });

    return urlsToProcess;
  };

  const updateTableWithShortenedUrls = (
    response: { processedUrls: any[] },
    columnIndex: number
  ) => {
    // Create new headers array with shortened URL column
    const newHeaders = [...headers];
    newHeaders.splice(columnIndex + 1, 0, `Shortened ${headers[columnIndex]}`);

    // Create new data array with shortened URLs
    const newData = data.map((row, rowIndex) => {
      const newRow = [...row];
      const shortenedUrl = response.processedUrls.find(
        (item: any) => item.rowIndex === rowIndex
      );
      newRow.splice(
        columnIndex + 1,
        0,
        shortenedUrl ? shortenedUrl.cellValue : ""
      );
      return newRow;
    });

    // Update states
    setHeaders(newHeaders);
    setData(newData);

    // Mark column as processed
    setUrlColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.columnIndex === columnIndex ? { ...col, isProcessed: true } : col
      )
    );
  };

  const readExcelFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const zip = new JSZip();
      const workbook = await zip.loadAsync(arrayBuffer);

      const sheetData = await workbook
        .file("xl/worksheets/sheet1.xml")
        ?.async("text");
      const sharedStringsData = await workbook
        .file("xl/sharedStrings.xml")
        ?.async("text");

      if (sheetData) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sheetData, "application/xml");
        const rows = Array.from(xmlDoc.getElementsByTagName("row"));
        const sharedStrings = parseSharedStrings(sharedStringsData);

        if (rows.length > 0) {
          const headers: string[] = [];
          const data: any[][] = [];

          // Parse first row as headers
          const headerCells = Array.from(rows[0].getElementsByTagName("c"));
          headerCells.forEach((cell) => {
            const value = getCellValue(cell, sharedStrings);
            headers.push(value);
          });

          // Parse subsequent rows as data
          for (let i = 1; i < rows.length; i++) {
            const cells = Array.from(rows[i].getElementsByTagName("c"));
            const rowData = cells.map((cell) =>
              getCellValue(cell, sharedStrings)
            );
            data.push(rowData);
          }

          setHeaders(headers);
          setData(data);
          detectUrlColumns(headers, data);
        }
      } else {
        throw new Error("sheet1.xml not found in the workbook.");
      }
    } catch (error) {
      setError("Error reading file. Please ensure it is a valid .xlsx file.");
      toast.error("Error parsing workbook. Please try again.");
    }
  };

  const parseSharedStrings = (sharedStringsData: string | undefined) => {
    if (!sharedStringsData) return [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sharedStringsData, "application/xml");
    const strings = Array.from(xmlDoc.getElementsByTagName("t")).map(
      (el) => el.textContent || ""
    );
    return strings;
  };

  const getCellValue = (cell: Element, sharedStrings: string[]) => {
    const type = cell.getAttribute("t");
    const valueElement = cell.getElementsByTagName("v")[0];
    if (!valueElement) return "";

    let value = valueElement.textContent || "";

    if (type === "s") {
      const index = parseInt(value, 10);
      value = sharedStrings[index] || value;
    }

    return value;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFileData(file);
      readExcelFile(file);
    } else {
      setError("Invalid file format");
    }
  };

  const shortenBatchUrls = async () => {
    if(user){
      if (!apiToken) {
        toast.error("API token not found. Please refresh the page and try again.");
        return;
      }
    }
    if(!apiToken){
      toast.error("Please login to shorten URLs");
      return
    }
    if (!selectedUrlColumn) {
      toast.error("Please select a URL column to process");
      return;
    }


    try {
      setBatchLoader(true);
      const urlsToProcess = prepareUrlsForProcessing(
        selectedUrlColumn.columnIndex
      );
      const res = await shortenBatchURLs(apiToken, urlsToProcess);
      updateTableWithShortenedUrls(res, selectedUrlColumn.columnIndex);
      toast.success("URLs shortened successfully");
      setSelectedUrlColumn(null); // Reset selection after processing
    } catch (error) {
      toast.error("Failed to shorten URLs");
    } finally {
      setBatchLoader(false);
    }
  };

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true);
      const wb = XLSX.utils.book_new();
      const excelData = [headers, ...data];
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const originalFileName = fileData?.name || "excel-data";
      const newFileName = `updated_${originalFileName}`;
      saveAs(blob, newFileName);
      toast.success("Excel file exported successfully!");
    } catch (error) {
      toast.error("Export error in Excel file");
      toast.error("Failed to export Excel file");
    } finally {
      setIsExporting(false);
    }
  };


  return (
    <div id="batch" className="relative h-auto w-full flex flex-col items-center sm:p-10 p-5">
      <Input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        labelPlacement="inside"
        description="Only .xlsx and .xls files are supported"
        className="sm:w-1/2 w-full mb-5 jost-bolder text-white"
        startContent={
          <span className="w-auto h-auto rounded-full cursor-pointer">
            <AttachFileIcon fontSize="small" className="text-black" />
          </span>
        }
        endContent={
          <span className="cursor-pointer" onClick={handleClear}>
            <CloseIcon className="text-black" />
          </span>
        }
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* URL Column Selection */}
      {urlColumns.length > 0 && (
        <div className="w-full max-w-2xl mb-4">
          <h3 className="text-xl righteous-regular font-semibold mb-2 text-white w-full flex justify-center items-center">
            Select URL Column to Process:
          </h3>
          <div className="flex flex-wrap gap-4 w-full justify-center">
            {urlColumns.map((column) => {
              return (
                <div
                  key={column.columnIndex}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    isSelected={
                      selectedUrlColumn?.columnIndex === column.columnIndex
                    }
                    onValueChange={(isSelected) =>
                      setSelectedUrlColumn(isSelected ? column : null)
                    }
                    disabled={column.isProcessed || batchLoader}
                  >
                    <span className="text-white jost-bolder ">{column.header} {column.isProcessed && "(Processed)"}</span>
                  </Checkbox>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {fileData && (
        <div className="w-5/6 h-100 overflow-y-auto overflow-x-auto bg-gray-100 flex justify-start items-start rounded p-5">
          {headers.length > 0 && data.length > 0 && (
            <Table aria-label="Example table with dynamic content">
              <TableHeader>
                {headers.map((header, index) => (
                  <TableColumn
                    key={index}
                    className="border border-gray-300 bg-gray-100"
                  >
                    <span className="righteous-regular text-medium text-center flex items-center justify-center">
                      {header}
                    </span>
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="border border-gray-300 p-2 w-auto"
                      >
                        <span className="flex text-center items-center justify-center jost-bolder text-black">
                          {cell}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      <div className="flex gap-4">
        {urlColumns.length > 0 && selectedUrlColumn && !batchLoader ? (
          <Button
            className="jost-bold text-medium p-4 my-4 text-white"
            color="success"
            onClick={shortenBatchUrls}
          >
            Shorten URLs in {selectedUrlColumn.header}
          </Button>
        ) : batchLoader ? (
          <Button
            className="jost-bold text-medium p-4 my-4 text-white"
            color="success"
            isLoading
          >
            Processing...
          </Button>
        ) : null}

        {headers.length > 0 &&
          data.length > 0 &&
          urlColumns.some((col) => col.isProcessed) && (
            <Button
              className="jost-bold text-medium p-4 my-4 text-white"
              color="primary"
              onClick={handleExportToExcel}
              isLoading={isExporting}
              disabled={batchLoader || isExporting}
            >
              {isExporting ? "Exporting..." : "Export Updated Excel"}
            </Button>
          )}
      </div>
    </div>
  );
}
