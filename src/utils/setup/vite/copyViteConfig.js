import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const copyViteConfig = async (routing, projectPath) => {
  const configSrc = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "templates",
    "react",
    `${routing}`,
    "vite.config.ts"
  );
  const configDest = path.join(projectPath, "vite.config.ts");

  fs.copyFileSync(configSrc, configDest);
};
