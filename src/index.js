#!/usr/bin/env node

import fs from "fs";
import path from "path";
import prompts from "prompts";
import { IGNORED_FILES } from "./constants/ignoredFiles.js";
import { questions } from "./constants/questions.js";
import { createProject } from "./createProject.js";
import { validateProjectName } from "./utils/validateProjectName.js";

(async () => {
  try {
    const initialAnswers = await prompts(questions, {
      onCancel: () => {
        console.log("\n❌ Setup cancelled.");
        process.exit(1);
      },
    });

    if (!initialAnswers.confirmSetup) {
      console.log("\n❌ Setup cancelled.");
      return;
    }

    // Validate project name early
    const validation = validateProjectName(initialAnswers.projectName);
    if (!validation.valid) {
      if (validation.nonEmpty) {
        // Prompt user if they want to clean the non-empty directory
        const response = await prompts({
          type: "confirm",
          name: "clean",
          message: `${validation.reason} Do you want to delete its contents and proceed?`,
          initial: false,
        });

        if (!response.clean) {
          console.log("\n❌ Setup cancelled by user.");
          return;
        }

        // Clean directory except .git and node_modules
        const folderPath =
          initialAnswers.projectName === "."
            ? process.cwd()
            : path.join(process.cwd(), initialAnswers.projectName);

        fs.readdirSync(folderPath).forEach((file) => {
          if (!file.includes(IGNORED_FILES)) {
            const filePath = path.join(folderPath, file);
            fs.rmSync(filePath, { recursive: true, force: true });
          }
        });

        console.log(`\n🧹 Cleaned contents of "${folderPath}".`);
      } else {
        console.error(`\n❌ ${validation.reason}`);
        return;
      }
    }

    // Proceed with project creation
    await createProject(initialAnswers);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
