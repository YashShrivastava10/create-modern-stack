import * as clack from "@clack/prompts";
import { execSync } from "child_process";
import fs from "fs";
import colors from "picocolors";
import { copyCssFile } from "./utils/copyCssFile.js";
import { copyTemplates } from "./utils/copyTemplates.js";
import { setProjectname } from "./utils/setProjectName.js";
import { setupBaseApp } from "./utils/setup/setupBaseApp.js";
import { setupPrettier } from "./utils/setup/setupPrettier.js";
import { setupShadcn } from "./utils/setup/setupShadcn.js";
import { setupStateManagement } from "./utils/setup/setupStateManagement.js";

const createProject = async (answers) => {
  const {
    projectName: projectNameFromInput,
    framework,
    routing,
    stateManagement,
    colorPalette,
  } = answers;

  const { projectNameInput, projectPath, isCurrentDir } =
    setProjectname(projectNameFromInput);

  clack.log.step(
    colors.cyan(
      `🚀 Initializing new ${framework} project: ${colors.yellow(
        projectNameInput
      )}`
    )
  );

  const s = clack.spinner(); // Create a single spinner instance

  try {
    // Step 1: Base Application Setup
    s.start("📁 Setting up base application structure...");
    // Assume setupBaseApp might throw on error
    await setupBaseApp(framework, projectNameInput, projectPath, routing); // Make async if it is
    s.stop("✅ Base application structure created successfully.");

    // Step 2: Install additional dependencies
    const additionalDependencies = [
      "tailwind-merge",
      "autoprefixer",
      "class-variance-authority",
      "clsx",
      "motion",
    ];

    s.start("📦 Installing core utilities & UI dependencies...");
    process.chdir(projectPath);
    execSync(`npm install ${additionalDependencies.join(" ")}`, {
      stdio: "pipe", // Capture output if you don't want it flooding the console
    });
    s.stop("✅ Core utilities & UI dependencies installed.");

    // Step 3: Setup Shadcn/ui
    s.start("🎨 Configuring shadcn/ui components...");
    await setupShadcn(); // Pass projectPath and answers if needed
    s.stop("✅ shadcn/ui configured.");

    // Step 4: Setup State Management
    s.start(
      `🧠 Integrating state management (${colors.yellow(
        stateManagement || "None"
      )})...`
    );
    await setupStateManagement(stateManagement, projectPath, framework); // Pass projectPath and framework
    s.stop("✅ State management integrated.");

    // Step 5: Copy Templates
    s.start("📄 Copying project-specific templates...");
    await copyTemplates(framework, stateManagement, projectPath, routing);
    s.stop("✅ Project-specific templates copied.");

    setupPrettier(projectPath);

    // Step 6: Apply CSS Theme
    s.start(`🎨 Applying '${colors.yellow(colorPalette)}' color theme...`);
    await copyCssFile(framework, colorPalette, projectPath);
    s.stop("✅ Color theme applied.");

    clack.outro(
      colors.bgGreen(
        colors.black(" 🎉 Project setup complete! Your modern stack is ready. ")
      )
    );

    const nextSteps = ["Next steps:"];
    if (!isCurrentDir) {
      nextSteps.push(`  cd ${projectNameInput}`);
    }
    nextSteps.push(
      "  npm install (if you haven't already or if using pnpm/yarn)"
    ); // Good reminder
    nextSteps.push("  npm run dev");
    nextSteps.push("\nHappy coding! ✨");

    clack.note(nextSteps.map((line) => colors.cyan(line)).join("\n"));
  } catch (error) {
    s.stop("❌ Operation failed."); // Stop spinner if it was active during an error
    clack.log.error(colors.red("❌ Critical Error: Project setup failed."));
    clack.log.error(colors.red(error.message || "An unknown error occurred."));
    if (error.stderr) {
      // If error came from execSync with stdio: 'pipe'
      clack.log.info(colors.gray(`Stderr: ${error.stderr.toString()}`));
    }
    if (error.stdout) {
      // If error came from execSync with stdio: 'pipe'
      clack.log.info(colors.gray(`Stdout: ${error.stdout.toString()}`));
    }
    // console.error(error); // For full stack trace during development

    if (!isCurrentDir && fs.existsSync(projectPath)) {
      clack.log.warn(
        colors.yellow(
          "\n🧹 An error occurred. Attempting to clean up created directory..."
        )
      );
      const sCleanup = clack.spinner();
      sCleanup.start(`Removing directory ${projectPath}...`);
      try {
        fs.rmSync(projectPath, { recursive: true, force: true });
        sCleanup.stop(
          colors.green(`✅ Successfully removed directory: ${projectPath}`)
        );
      } catch (cleanupError) {
        sCleanup.stop(
          colors.red(`❌ Failed to remove directory: ${projectPath}`)
        );
        clack.log.error(colors.red(cleanupError.message));
        clack.log.info(colors.yellow("You may need to remove it manually."));
      }
    }
    clack.outro(colors.inverse(colors.red(" Setup aborted due to error. ")));
    process.exit(1); // Ensure non-zero exit code on failure
  }
};

export { createProject };
