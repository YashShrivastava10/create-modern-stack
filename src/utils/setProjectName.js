import fs from "fs";
import path from "path";
import colors from "picocolors";

export const setProjectname = async (projectNameFromInput, s) => {
  return new Promise((resolve, reject) => {
    try {
      const projectNameInput = projectNameFromInput.trim();
      const isCurrentDir = projectNameInput === ".";

      const projectName = isCurrentDir
        ? path.basename(process.cwd())
        : projectNameInput;

      const projectPath = isCurrentDir
        ? process.cwd()
        : path.join(process.cwd(), projectName);

      s.start(
        colors.cyan(`Initializing project at: ${colors.yellow(projectPath)}`)
      );

      if (!isCurrentDir) {
        fs.mkdirSync(projectPath, { recursive: true });
      }
      s.stop(colors.green(`Folder created at: ${colors.yellow(projectPath)}`));
      resolve({ projectNameInput, projectPath, isCurrentDir });
    } catch (e) {
      reject(e);
    }
  });
};
