// controllers/animalBenchmarkController.js
import csvtojson from "csvtojson";
import fs from "fs";
import path from "path";

// Path to store static JS data
const benchmarksJsFilePath = path.join(
  process.cwd(),
  "data/animalBenchmarks.js"
);
// Generate a unique filename using the current timestamp
//  const uniqueFileName = `animalBenchmark_${Date.now()}.js`;

// Upload CSV and store as JS file
export const uploadCSV = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "uploads", req.file.filename);

    // Parse the CSV file
    const jsonData = await csvtojson().fromFile(filePath);

    // Prepare the JS file content that exports the data
    const fileContent = `export default ${JSON.stringify(jsonData, null, 2)};`;

    // Write the content to a .js file
    // fs.writeFileSync(benchmarksJsFilePath, fileContent); //overwrites or rewrites the whole file
    fs.appendFileSync(benchmarksJsFilePath, fileContent); // writes in the same file
    // fs.writeFileSync(uniqueFileName, fileContent); //new unique file is generated

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res
      .status(201)
      .json({ message: "CSV processed and data stored as static JS file" });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload and process CSV" });
  }
};

// Get the stored static data (by requiring the .js file)
export const getAllBenchmarks = async (req, res) => {
  try {
    // Check if the static JS file exists
    if (fs.existsSync(benchmarksJsFilePath)) {
      // Dynamically import the .js file that exports the data
      const data = await import(benchmarksJsFilePath);
      res.status(200).json(data.default); // Use .default to access the exported data
    } else {
      res.status(404).json({ error: "No benchmark data found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve benchmark data" });
  }
};
