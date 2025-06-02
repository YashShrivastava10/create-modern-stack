import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupPrettier = (projectPath) => {
  fsExtra.copySync(
    path.join(__dirname, "..", "..", "configs", ".prettierrc"),
    path.join(projectPath, ".prettierrc")
  );
};
