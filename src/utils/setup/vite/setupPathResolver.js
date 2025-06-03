import path from "path";
import { execPromise } from "../../execPromise.js";
import { updateTsConfig } from "./updateTSConfig.js";

export const setupPathResolver = async (projectPath) => {
  await execPromise("npm i -D @types/node", {
    stdio: "pipe",
  });

  updateTsConfig(path.join(projectPath, "tsconfig.json"));
  updateTsConfig(path.join(projectPath, "tsconfig.app.json"));
};
