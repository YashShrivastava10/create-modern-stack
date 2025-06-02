#!/usr/bin/env node

import * as clack from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import colors from "picocolors";

import { IGNORED_FILES } from "./constants/ignoredFiles.js";
import { createProject } from "./createProject.js";
import { getChoiceSummary } from "./utils/getChoiceSummary.js";
import {
  handleProjectNameValidationAndClean,
  validateProjectNameSyntaxForClack,
} from "./utils/validateProjectName.js";

export const getCancelMessage = (value) => {
  if (clack.isCancel(value)) {
    clack.cancel("Setup cancelled.");
    process.exit(1);
  }
};

(async () => {
  clack.intro(colors.inverse(" Create Modern Stack Setup "));

  try {
    const userChoice = {};
    let projectNameOkay = false;
    let confirmedToCleanProjectDir = false;
    let projectTargetPath = "";

    let isFirstProjectNameAttempt = true;
    let previousTypedName = "";

    // 1. Project Name - Loop until valid and user confirms cleaning if needed
    while (!projectNameOkay) {
      const nameResponse = await clack.text({
        message: `${colors.cyan(
          "Project Name:"
        )} What is your project named? (use '.' to use current directory)`,
        placeholder: "my-app",
        initialValue: isFirstProjectNameAttempt ? "" : previousTypedName,
        validate: (value) => {
          // If it's the first attempt and value is empty, it's fine (will default)
          if (value.trim() === "") {
            return undefined;
          }
          // Otherwise, apply normal syntax validation
          return validateProjectNameSyntaxForClack(value);
        },
      });
      getCancelMessage(nameResponse); // Handles cancellation of clack.text

      let effectiveName = nameResponse ? nameResponse.trim() : "my-app";

      if (effectiveName === "") {
        clack.log.info(
          `No project name entered, defaulting to "${effectiveName}".`
        );
      }

      previousTypedName = nameResponse; // Store the raw input for re-editing if next validation fails
      isFirstProjectNameAttempt = false;

      // Now validate directory status and prompt for clean if needed
      const validationResult = await handleProjectNameValidationAndClean(
        effectiveName
      );

      if (validationResult.proceed) {
        userChoice.projectName = effectiveName;
        confirmedToCleanProjectDir = validationResult.confirmedToClean;
        projectTargetPath = validationResult.targetPath;
        projectNameOkay = true;
      } else {
        // If validationResult.proceed is false, messages are logged by the handler.
        // Loop will continue to ask for project name again.
        // Reset projectName so initialValue in prompt is 'my-app' or last valid attempt
        // userChoice.projectName = undefined;
      }
    }

    // 2. Framework
    userChoice.framework = await clack.select({
      message: `${colors.cyan(
        "Framework:"
      )} Which framework do you want to use?`,
      initialValue: "react",
      options: [
        { value: "react", label: "React.js" },
        { value: "next", label: "Next.js" },
      ],
    });
    getCancelMessage(userChoice.framework);

    // 3. Routing (conditional)
    if (userChoice.framework === "react") {
      userChoice.routing = await clack.select({
        message: `${colors.cyan(
          "Routing Lib (React):"
        )} Pick a routing library:`,
        initialValue: "tanstack-router",
        options: [
          { value: "tanstack-router", label: "TanStack Router" },
          { value: "react-router", label: "React Router" },
        ],
      });
      getCancelMessage(userChoice.routing);
    } else {
      userChoice.routing = null;
    }

    // 4. State Management
    userChoice.stateManagement = await clack.select({
      message: `${colors.cyan(
        "State Management:"
      )} Select a state management library:`,
      initialValue: "zustand",
      options: [
        { value: "zustand", label: "Zustand (simple and lightweight)" },
        { value: "redux", label: "Redux (for complex state)" },
        { value: "context", label: "None / React Context" },
      ],
    });
    getCancelMessage(userChoice.stateManagement);

    // 5. Color Palette
    userChoice.colorPalette = await clack.select({
      message: `${colors.cyan("Color Theme:")} Choose a color theme:`,
      initialValue: "purple",
      options: [
        { value: "default", label: "Default" },
        { value: "purple", label: "Purple" },
        { value: "blue", label: "Blue" },
        { value: "red", label: "Red" },
      ],
    });
    getCancelMessage(userChoice.colorPalette);

    // Summary
    getChoiceSummary(userChoice);

    // 6. Final Confirmation
    userChoice.confirmSetup = await clack.confirm({
      message: `${colors.cyan(
        "Confirmation:"
      )} Are you happy with your choices and ready to proceed?`,
      initialValue: true,
    });
    if (clack.isCancel(userChoice.confirmSetup) || !userChoice.confirmSetup) {
      clack.cancel("Setup cancelled.");
      process.exit(0);
    }

    // --- Cleaning and Project Creation ---
    if (confirmedToCleanProjectDir) {
      const s = clack.spinner();
      s.start(
        `Cleaning contents of "${
          userChoice.projectName === "."
            ? "current directory"
            : projectTargetPath
        }"...`
      );
      try {
        fs.readdirSync(projectTargetPath).forEach((file) => {
          if (!IGNORED_FILES.includes(file)) {
            const filePath = path.join(projectTargetPath, file);
            fs.rmSync(filePath, { recursive: true, force: true });
          }
        });
        s.stop(
          `🧹 Cleaned contents of "${
            userChoice.projectName === "."
              ? "current directory"
              : projectTargetPath
          }".`
        );
      } catch (err) {
        s.stop("Cleaning failed.");
        clack.log.error(colors.red(`Error cleaning directory: ${err.message}`));
        process.exit(1);
      }
    }

    // Ensure project directory exists (it might be new, or just emptied)
    if (!fs.existsSync(projectTargetPath)) {
      try {
        fs.mkdirSync(projectTargetPath, { recursive: true });
      } catch (err) {
        clack.log.error(
          colors.red(
            `Error creating directory "${projectTargetPath}": ${err.message}`
          )
        );
        process.exit(1);
      }
    }

    const s = clack.spinner();
    s.start("Creating project...");
    await createProject(userChoice);
    s.stop("Project created successfully!");

    clack.outro(colors.green("All done! Happy coding! 🎉"));
  } catch (err) {
    if (!clack.isCancel(err)) {
      clack.log.error(
        colors.red(`An unexpected error occurred: ${err.message}`)
      );
      console.error(err);
    }
    process.exit(1);
  }
})();
