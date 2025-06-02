// utils/validateProjectName.js

import * as clack from "@clack/prompts"; // For the confirm prompt
import fs from "node:fs";
import path from "node:path";
import colors from "picocolors";
import { IGNORED_FILES } from "../constants/ignoredFiles.js"; // Make sure this path is correct

// Syntax validator for clack.text
export const validateProjectNameSyntaxForClack = (input) => {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return "Project name cannot be empty.";
  }
  if (/[<>:"/\\|?*]/.test(trimmed)) {
    return "Project name contains invalid characters.";
  }
  // Add other syntax checks if needed
  return undefined;
};

// This function will check directory status and prompt for cleaning if necessary.
// It returns an object: { proceed: boolean, confirmedToClean: boolean, targetPath: string }
// 'proceed: false' means the user should be prompted for the name again.
export async function handleProjectNameValidationAndClean(projectName) {
  const trimmed = projectName.trim(); // Should already be trimmed from clack.text
  const cwd = process.cwd();
  const targetPath = path.resolve(cwd, trimmed);
  let confirmedToClean = false;

  // Case 1: Current directory
  if (trimmed === ".") {
    try {
      const contents = fs
        .readdirSync(cwd)
        .filter((item) => !IGNORED_FILES.includes(item));
      if (contents.length > 0) {
        clack.log.warn(colors.yellow("Current directory is not empty."));
        const shouldClean = await clack.confirm({
          message: "Do you want to delete its contents and proceed?",
          initialValue: false,
        });
        if (clack.isCancel(shouldClean) || !shouldClean) {
          clack.log.info(
            "Please choose a different project name or manually clear the directory."
          );
          return { proceed: false, confirmedToClean: false, targetPath };
        }
        confirmedToClean = true;
      }
    } catch (err) {
      clack.log.error(
        colors.red(`Error reading current directory: ${err.message}`)
      );
      return { proceed: false, confirmedToClean: false, targetPath };
    }
    return { proceed: true, confirmedToClean, targetPath };
  }

  // Case 2: Named directory
  try {
    if (fs.existsSync(targetPath)) {
      const stats = fs.statSync(targetPath);
      if (!stats.isDirectory()) {
        clack.log.error(
          colors.red(
            `A file named "${trimmed}" already exists at this location. Please choose a different name.`
          )
        );
        return { proceed: false, confirmedToClean: false, targetPath };
      }

      // It's a directory, check if empty
      const contents = fs
        .readdirSync(targetPath)
        .filter((item) => !IGNORED_FILES.includes(item));

      if (contents.length > 0) {
        clack.log.warn(
          colors.yellow(
            `Directory "${trimmed}" already exists and is not empty.`
          )
        );
        const shouldClean = await clack.confirm({
          message: "Do you want to delete its contents and proceed?",
          initialValue: false,
        });
        if (clack.isCancel(shouldClean) || !shouldClean) {
          clack.log.info(
            "Please choose a different project name or manually clear the directory."
          );
          return { proceed: false, confirmedToClean: false, targetPath };
        }
        confirmedToClean = true;
      }
      // If it exists and is empty, that's fine.
    }
    // If it doesn't exist, that's also fine (it will be created).

    // Optional: Add case-insensitive conflict check if desired
    // const existingDirs = fs.readdirSync(cwd).filter(item => fs.statSync(path.join(cwd, item)).isDirectory());
    // const lowerTrimmed = trimmed.toLowerCase();
    // const conflictingDir = existingDirs.find(dir => dir.toLowerCase() === lowerTrimmed && dir !== trimmed);
    // if (conflictingDir) {
    //     clack.log.error(colors.red(`Name conflicts with existing directory "${conflictingDir}" (case-insensitive).`));
    //     return { proceed: false, confirmedToClean: false, targetPath };
    // }
  } catch (err) {
    clack.log.error(
      colors.red(`Error accessing path "${trimmed}": ${err.message}`)
    );
    return { proceed: false, confirmedToClean: false, targetPath };
  }

  return { proceed: true, confirmedToClean, targetPath };
}
