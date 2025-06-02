import fs from "fs";
import { parse, printParseErrorCode } from "jsonc-parser";

/**
 * Merges baseUrl and paths into a tsconfig file (handles JSON with comments).
 * @param {string} filePath - Absolute path to the tsconfig file
 */
export const updateTsConfig = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${filePath}`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  const errors = [];
  const config = parse(raw, errors, { allowTrailingComma: true });

  if (errors.length) {
    console.error("❌ Failed to parse JSONC:");
    errors.forEach((err) =>
      console.error(
        `  - ${printParseErrorCode(err.error)} at offset ${err.offset}`
      )
    );
    return;
  }

  config.compilerOptions = config.compilerOptions || {};
  config.compilerOptions.baseUrl = ".";
  config.compilerOptions.paths = {
    ...(config.compilerOptions.paths || {}),
    "@/*": ["./src/*"],
  };

  const updatedContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(filePath, updatedContent);
};
