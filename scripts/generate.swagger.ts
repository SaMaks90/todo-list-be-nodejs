import fs from "fs";
import path from "path";
import { specs } from "../src/config/swagger";

const outputPath = path.resolve(__dirname, "../docs/swagger.json");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));

console.log("Swagger JSON file generated successfully!");
