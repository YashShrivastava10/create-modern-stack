import fs from "fs";
import path from "path";
import { execPromise } from "../../execPromise.js";

export const setupTailwind = async (projectPath) => {
  await execPromise("npm i -D tailwindcss", {
    stdio: "pipe",
  });
  await execPromise("npm i @tailwindcss/vite", {
    stdio: "pipe",
  });

  const indexCssPath = path.join(projectPath, "src", "index.css");

  if (!fs.existsSync(indexCssPath)) {
    console.warn(`⚠️ File not found: ${indexCssPath}`);
    return;
  }

  const content = '@import "tailwindcss";\n';

  fs.writeFileSync(indexCssPath, content, "utf-8");
};
