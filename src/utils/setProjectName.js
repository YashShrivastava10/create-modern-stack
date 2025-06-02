import chalk from "chalk";
import fs from "fs";
import path from "path";

export const setProjectname = (projectNameFromInput) => {
  const projectNameInput = projectNameFromInput.trim();
  const isCurrentDir = projectNameInput === ".";

  const projectName = isCurrentDir
    ? path.basename(process.cwd())
    : projectNameInput;

  const projectPath = isCurrentDir
    ? process.cwd()
    : path.join(process.cwd(), projectName);

  if (!isCurrentDir) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  console.log(
    chalk.gray("\n[info]"),
    "Initializing project at",
    chalk.blue.bold(projectPath),
    "\n"
  );

  return {
    projectNameInput,
    projectPath,
    isCurrentDir,
  };
};
