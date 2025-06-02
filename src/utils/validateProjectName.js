import fs from "fs";
import path from "path";
import { IGNORED_FILES } from "../constants/ignoredFiles.js";

export const validateProjectName = (input) => {
  const trimmed = input.trim();
  const cwd = process.cwd();

  if (trimmed === ".") {
    const contents = fs
      .readdirSync(cwd)
      .filter((item) => !IGNORED_FILES.includes(item));
    if (contents.length > 0) {
      return {
        valid: false,
        reason: "Current directory is not empty.",
        nonEmpty: true,
      };
    }
    return { valid: true };
  }

  const existingDirs = fs
    .readdirSync(cwd)
    .filter((item) => fs.statSync(path.join(cwd, item)).isDirectory());

  const lowerTrimmed = trimmed.toLowerCase();
  const conflictingDir = existingDirs.find(
    (dir) => dir.toLowerCase() === lowerTrimmed
  );

  if (conflictingDir) {
    const conflictPath = path.join(cwd, conflictingDir);
    const contents = fs
      .readdirSync(conflictPath)
      .filter((item) => !IGNORED_FILES.includes(item));

    if (conflictingDir === trimmed) {
      if (contents.length > 0) {
        return {
          valid: false,
          reason: `Directory "${trimmed}" already exists and is not empty.`,
          nonEmpty: true,
          path: conflictPath,
        };
      } else {
        return { valid: true };
      }
    } else {
      return {
        valid: false,
        reason: `Name conflicts with existing directory "${conflictingDir}" (case-insensitive).`,
      };
    }
  }

  return { valid: true };
};
