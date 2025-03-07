const fs = require("fs");
const path = require("path");

const version = process.argv[2];

if (!version) {
  console.error("Error: Version number not provided");
  console.error("Usage: node scripts/updateVersion.js <version>");
  process.exit(1);
}

const filePath = path.join(__dirname, "..", "public", "version.json");

const updateJsonVersion = (filePath, version) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading version.json:", err);
      process.exit(1);
    }

    try {
      const jsonData = JSON.parse(data);
      jsonData.version = version;

      const updatedJson = JSON.stringify(jsonData, null, 2); // Pretty-print with 2-space indentation

      fs.writeFile(filePath, updatedJson, "utf8", (err) => {
        if (err) {
          console.error("Error writing to version.json:", err);
          process.exit(1);
        }
        console.log(`Successfully updated version.json to version ${version}`);
      });
    } catch (parseError) {
      console.error("Error parsing version.json:", parseError);
      process.exit(1);
    }
  });
};

updateJsonVersion(filePath, version);
