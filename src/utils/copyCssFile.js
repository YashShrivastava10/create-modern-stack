import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyCssFile = (framework, colorPalette, projectPath) => {
  const cssBasePath = path.join(__dirname, "..", "styles");

  const baseCss = fs.readFileSync(path.join(cssBasePath, "base.css"), "utf-8");

  const themeCss = fs.readFileSync(
    path.join(cssBasePath, `theme-${colorPalette}.css`),
    "utf-8"
  );

  const finalCss = `${baseCss}\n\n${themeCss}`;

  const destPath =
    framework === "next"
      ? path.join(projectPath, "src", "app", "globals.css")
      : path.join(projectPath, "src", "index.css");

  fs.writeFileSync(destPath, finalCss, "utf-8");
};

export { copyCssFile };
