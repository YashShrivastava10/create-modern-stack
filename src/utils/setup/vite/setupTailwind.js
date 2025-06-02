import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export const setupTailwind = (projectPath) => {
  execSync("npm i -D tailwindcss", {
    stdio: "inherit",
  });
  execSync("npm i @tailwindcss/vite", {
    stdio: "inherit",
  });

  const indexCssPath = path.join(projectPath, "src", "index.css");

  if (!fs.existsSync(indexCssPath)) {
    console.warn(`⚠️ File not found: ${indexCssPath}`);
    return;
  }

  const content = '@import "tailwindcss";\n';

  fs.writeFileSync(indexCssPath, content, "utf-8");
  console.log(
    `✅ Replaced content of src/index.css with '@import("tailwindcss");'`
  );
};
