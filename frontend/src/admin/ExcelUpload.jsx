import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUpload = () => {
  const [data, setData] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      const wb = XLSX.read(binaryString, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws);
      setData(json); // Set the parsed data into state
    };
    reader.readAsBinaryString(file);
  };

  // Function to download data in Excel format
  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data); // Convert the JSON data to a sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dog Data");
    XLSX.writeFile(wb, "dog_benchmark_data.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="border p-2 rounded"
        />
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Download Data as Excel
        </button>

        {/* Displaying the data */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Breed</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Weight (Average)</th>
                <th className="border p-2">Height</th>
                <th className="border p-2">Lifespan</th>
                <th className="border p-2">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2">{row.breed}</td>
                  <td className="border p-2">{row.size}</td>
                  <td className="border p-2">{row.weight?.average}</td>
                  <td className="border p-2">{row.height_at_wither}</td>
                  <td className="border p-2">{row.lifespan}</td>
                  <td className="border p-2">{row.average_temperature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExcelUpload;
