import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs";
import { copyCssFile } from "./utils/copyCssFile.js";
import { copyTemplates } from "./utils/copyTemplates.js";
import { setProjectname } from "./utils/setProjectName.js";
import { setupBaseApp } from "./utils/setup/setupBaseApp.js";
import { setupShadcn } from "./utils/setup/setupShadcn.js";
import { setupStateManagement } from "./utils/setup/setupStateManagement.js";

const createProject = (answers) => {
  const {
    projectName: projectNameFromInput,
    framework,
    routing,
    stateManagement,
    colorPalette,
  } = answers;

  const { projectNameInput, projectPath, isCurrentDir } =
    setProjectname(projectNameFromInput);

  console.log(
    chalk.bold.cyanBright(
      `\n🚀 Initializing new ${framework} project: ${chalk.yellow(
        projectNameInput
      )}`
    )
  );
  console.log(chalk.dim("--------------------------------------------------"));

  try {
    // Step 1: Base Application Setup
    console.log(
      chalk.blueBright("\n[1/6] 📁 Setting up base application structure...")
    );
    setupBaseApp(framework, projectNameInput, projectPath, routing);
    console.log(
      chalk.green("✅ Base application structure created successfully.")
    );

    // Step 2: Install additional dependencies
    // Renamed 'extras' to 'additionalDependencies' for clarity
    const additionalDependencies = [
      "tailwind-merge",
      "autoprefixer",
      "class-variance-authority",
      "motion", // Consider if this is always needed or conditional
    ];

    console.log(
      chalk.blueBright(
        "\n[2/6] 📦 Installing core utilities & UI dependencies..."
      )
    );
    process.chdir(projectPath); // Ensure we are in the project directory
    execSync(`npm install ${additionalDependencies.join(" ")}`, {
      stdio: "inherit",
    });
    console.log(chalk.green("✅ Core utilities & UI dependencies installed."));

    // Step 3: Setup Shadcn/ui
    console.log(
      chalk.blueBright("\n[3/6] 🎨 Configuring shadcn/ui components...")
    );
    setupShadcn(); // Assuming this logs its own progress if complex
    console.log(chalk.green("✅ shadcn/ui configured."));

    // Step 4: Setup State Management
    console.log(
      chalk.blueBright(
        `\n[4/6] 🧠 Integrating state management (${chalk.yellow(
          stateManagement || "None"
        )})...`
      )
    );
    setupStateManagement(stateManagement);
    console.log(chalk.green("✅ State management integrated."));

    // Step 5: Copy Templates
    console.log(
      chalk.blueBright("\n[5/6] 📄 Copying project-specific templates...")
    );
    copyTemplates(framework, stateManagement, projectPath, routing);
    console.log(chalk.green("✅ Project-specific templates copied."));

    // Step 6: Apply CSS Theme
    console.log(
      chalk.blueBright(
        `\n[6/6] 🎨 Applying '${chalk.yellow(colorPalette)}' color theme...`
      )
    );
    copyCssFile(framework, colorPalette, projectPath);
    console.log(chalk.green("✅ Color theme applied."));

    console.log(
      chalk.dim("--------------------------------------------------")
    );
    console.log(
      chalk.bold.greenBright(
        "\n🎉 Project setup complete! Your modern stack is ready."
      )
    );
    console.log(chalk.whiteBright("\nNext steps:"));
    if (!isCurrentDir) {
      console.log(chalk.cyan(`  cd ${projectNameInput}`));
    }
    console.log(chalk.cyan("  npm run dev"));
    console.log(chalk.yellow("\nHappy coding! ✨"));
  } catch (error) {
    // Changed 'e' to 'error' for convention
    console.error(chalk.red.bold("\n❌ Critical Error: Project setup failed."));
    console.error(
      chalk.red("--------------------------------------------------")
    );
    console.error(chalk.red("An error occurred during the setup process:"));
    console.error(error); // Log the full error object for debugging
    console.error(
      chalk.red("--------------------------------------------------")
    );

    if (!isCurrentDir && fs.existsSync(projectPath)) {
      // Check if path exists before attempting removal
      console.log(
        chalk.yellowBright(
          "\n🧹 An error occurred. Attempting to clean up created directory..."
        )
      );
      try {
        fs.rmSync(projectPath, { recursive: true, force: true });
        console.log(
          chalk.green(`✅ Successfully removed directory: ${projectPath}`)
        );
      } catch (cleanupError) {
        console.error(
          chalk.red(`❌ Failed to remove directory: ${projectPath}`)
        );
        console.error(cleanupError);
        console.log(chalk.yellow("You may need to remove it manually."));
      }
    }
    console.log(
      chalk.yellow(
        "\nPlease review the error messages above to diagnose the issue."
      )
    );
  }
};

export { createProject };
