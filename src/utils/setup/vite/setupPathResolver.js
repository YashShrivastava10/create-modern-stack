import { execSync } from "child_process";
import path from "path";
import { updateTsConfig } from "./updateTSConfig.js";

export const setupPathResolver = (projectPath) => {
  execSync("npm i -D @types/node", {
    stdio: "inherit",
  });

  updateTsConfig(path.join(projectPath, "tsconfig.json"));
  updateTsConfig(path.join(projectPath, "tsconfig.app.json"));
};
