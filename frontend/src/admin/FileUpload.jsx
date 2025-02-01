import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const FileUpload = () => {
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [manualData, setManualData] = useState({
    animal_type: '',
    breed: '',
    size: '',
    weight: '',
    height_at_wither: '',
    lifespan: '',
    average_temperature: '',
    age_data: [],
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'csv') {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const rows = text.split('\n').map((row) => row.split(','));
        setFileData(rows);
      };
      reader.readAsText(file);
    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setFileData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a valid CSV or XLSX file.');
    }
  };

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualData({
      ...manualData,
      [name]: value,
    });
  };

  const handleAgeDataChange = (index, field, value) => {
    const updatedAgeData = [...manualData.age_data];
    updatedAgeData[index][field] = value;
    setManualData({
      ...manualData,
      age_data: updatedAgeData,
    });
  };

  const handleAddAgeData = () => {
    setManualData({
      ...manualData,
      age_data: [
        ...manualData.age_data,
        {
          age_range: { min: '', max: '' },
          weight_range: { min: '', max: '' },
          growth_rate: '',
        },
      ],
    });
  };

  const handleSubmitManualData = () => {
    console.log('Submitting manual data:', manualData);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-4 min-h-screen">
      <div className="p-4 rounded-lg shadow-lg w-full max-w-2xl bg-white">
        <h2 className="text-xl font-semibold text-center mb-3 text-gray-700">Upload Animal Benchmark Data</h2>
        
        {/* File Upload Section */}
        <div className="mb-3">
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-600 mb-1">
            Choose a file to upload
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* File Data Preview */}
        {fileData && (
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">File Data Preview:</h3>
            <pre className="p-2 text-xs bg-gray-100 rounded border border-gray-300 overflow-x-auto">
              {JSON.stringify(fileData, null, 2)}
            </pre>
          </div>
        )}

        {/* Manual Data Entry Section */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Manual Data Entry</h3>
          <form>
            <div className="grid grid-cols-2 gap-2">
              {['animal_type', 'breed', 'size', 'weight', 'height_at_wither', 'lifespan', 'average_temperature'].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {field.replace(/_/g, ' ').toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={manualData[field]}
                    onChange={handleManualInputChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Age Data Section */}
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-1">Age Data</h4>
              {manualData.age_data.map((ageEntry, index) => (
                <div key={index} className="mb-3 p-2 rounded border border-gray-300 bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Age Range Min"
                      value={ageEntry.age_range.min}
                      onChange={(e) => handleAgeDataChange(index, 'age_range', { ...ageEntry.age_range, min: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Age Range Max"
                      value={ageEntry.age_range.max}
                      onChange={(e) => handleAgeDataChange(index, 'age_range', { ...ageEntry.age_range, max: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Weight Range Min"
                      value={ageEntry.weight_range.min}
                      onChange={(e) => handleAgeDataChange(index, 'weight_range', { ...ageEntry.weight_range, min: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Weight Range Max"
                      value={ageEntry.weight_range.max}
                      onChange={(e) => handleAgeDataChange(index, 'weight_range', { ...ageEntry.weight_range, max: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Growth Rate"
                    value={ageEntry.growth_rate}
                    onChange={(e) => handleAgeDataChange(index, 'growth_rate', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAgeData}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
              >
                Add Age Data
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmitManualData}
              className="w-full bg-blue-500 text-white py-1 mt-3 rounded-md text-sm hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
