import * as clack from "@clack/prompts";
import fs from "fs";
import path from "path";
import colors from "picocolors";

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

  clack.log.step(
    `${colors.gray("[info]")} Initializing project at ${colors.blue(
      colors.bold(projectPath)
    )}`
  );

  return {
    projectNameInput,
    projectPath,
    isCurrentDir,
  };
};
