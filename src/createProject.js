import * as clack from "@clack/prompts";
import fs from "fs";
import colors from "picocolors";
import { capitalizeFirstLetter } from "./utils/captilaizeFirstLetter.js";
import { copyCssFile } from "./utils/copyCssFile.js";
import { copyTemplates } from "./utils/copyTemplates.js";
import { execPromise } from "./utils/execPromise.js";
import { setProjectname } from "./utils/setProjectName.js";
import { setupBaseApp } from "./utils/setup/setupBaseApp.js";
import { setupPrettier } from "./utils/setup/setupPrettier.js";
import { setupShadcn } from "./utils/setup/setupShadcn.js";
import { setupStateManagement } from "./utils/setup/setupStateManagement.js";
import { copyViteConfig } from "./utils/setup/vite/copyViteConfig.js";
import { setupPathResolver } from "./utils/setup/vite/setupPathResolver.js";
import { setupRoute } from "./utils/setup/vite/setupRoute.js";

const getPaletteColorFunction = (palette) => {
  switch (palette.toLowerCase()) {
    case "purple":
      return colors.magenta;
    case "blue":
      return colors.blue;
    case "red":
      return colors.red;
    case "default":
    default:
      return colors.gray;
  }
};

const createProject = async (answers) => {
  const {
    projectName: projectNameFromInput,
    framework,
    routing,
    stateManagement,
    colorPalette,
  } = answers;

  const s = clack.spinner();
  // Step 1: Create folder
  const { projectNameInput, projectPath, isCurrentDir } = await setProjectname(
    projectNameFromInput,
    s
  );

  try {
    // Step 2: Base Application Setup
    s.start(`Installing ${colors.cyan(capitalizeFirstLetter(framework))}...`);
    await setupBaseApp(framework, projectNameInput, projectPath, routing);
    s.stop(
      colors.green(`${capitalizeFirstLetter(framework)} sucessfully installed`)
    );

    // Step 3: Routing Lib (React)
    if (framework === "react") {
      s.start(`Installing ${colors.cyan(capitalizeFirstLetter(routing))}...`);
      await setupRoute(routing);
      s.stop(
        colors.green(`${capitalizeFirstLetter(routing)} sucessfully installed`)
      );
    }

    process.chdir(projectPath);

    // Step 4: State Management
    if (stateManagement !== "context") {
      s.start(
        `Installing ${colors.cyan(capitalizeFirstLetter(stateManagement))}...`
      );
      await setupStateManagement(stateManagement, projectPath, framework);
      s.stop(
        colors.green(
          `${capitalizeFirstLetter(stateManagement)} sucessfully installed`
        )
      );
    } else {
      s.start(colors.cyan("Context is already present"));
      s.stop(colors.green("Context is already present"));
    }

    // Step 5: Setup Congifs file
    s.start(colors.cyan("Generating config files..."));
    if (framework === "react") {
      await copyViteConfig(routing, projectPath);
      await setupPathResolver(projectPath);
    }
    await setupPrettier(projectPath);
    s.stop(colors.green("Config file generated."));

    // Step 6: ShadCn, Motion
    s.start(colors.cyan("Installing core utilities & UI dependencies..."));
    const additionalDependencies = [
      "tailwind-merge",
      "autoprefixer",
      "class-variance-authority",
      "clsx",
      "motion",
    ];

    await execPromise(`npm install ${additionalDependencies.join(" ")}`, {
      stdio: "pipe",
    });
    await setupShadcn();
    s.stop(colors.green("Core utilities & UI dependencies installed."));

    // Step 7: Copy Templates
    s.start(colors.cyan("Generating project-specific templates..."));
    await copyTemplates(framework, stateManagement, projectPath, routing);
    s.stop(colors.green("Project-specific templates generated."));

    // Step 8: Apply CSS Theme
    const paletteDisplayColor = getPaletteColorFunction(colorPalette);
    const capitalizedPalette = capitalizeFirstLetter(colorPalette);

    s.start(
      `Applying '${paletteDisplayColor(capitalizedPalette)}' color theme...`
    );
    await copyCssFile(framework, colorPalette, projectPath);
    s.stop(`${paletteDisplayColor(capitalizedPalette)} color theme applied.`);

    // Outro
    clack.outro(
      colors.bgGreen(
        colors.black("Project setup complete! Your modern stack is ready. ")
      )
    );

    const nextSteps = ["Next steps:"];
    if (!isCurrentDir) {
      nextSteps.push(`  cd ${projectNameInput}`);
    }
    nextSteps.push("  npm run dev");

    clack.note(nextSteps.map((line) => colors.cyan(line)).join("\n"));
  } catch (error) {
    console.log(error);
    s.stop("❌ Operation failed.");
    clack.log.error(colors.red("❌ Critical Error: Project setup failed."));
    clack.log.error(colors.red(error.message || "An unknown error occurred."));
    if (error.stderr) {
      clack.log.info(colors.gray(`Stderr: ${error.stderr.toString()}`));
    }
    if (error.stdout) {
      clack.log.info(colors.gray(`Stdout: ${error.stdout.toString()}`));
    }

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
    process.exit(1);
  }
};

export { createProject };
