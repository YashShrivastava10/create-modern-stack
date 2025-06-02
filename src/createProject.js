import { execSync } from "child_process";
import fs from "fs";
import { copyCssFile } from "./utils/copyCssFile.js";
import { copyTemplates } from "./utils/copyTemplates.js";
import { setProjectname } from "./utils/setProjectName.js";
import { setupBaseApp } from "./utils/setup/setupBaseApp.js";
import { setupStateManagement } from "./utils/setup/setupStateManagement.js";

const createProject = (answers) => {
  const {
    projectName: projectNameFromInput,
    framework,
    routing,
    stateManagement,
    colorPalette,
  } = answers;

  // Step 1: Setting Folder name
  const { projectNameInput, projectPath, isCurrentDir } =
    setProjectname(projectNameFromInput);

  try {
    // Step 2: Scaffold base app
    setupBaseApp(framework, projectNameInput, projectPath, routing);

    // Step 3: Install shared dependencies
    const extras = [
      "tailwind-merge",
      "autoprefixer",
      "class-variance-authority",
      "motion",
    ];

    process.chdir(projectPath);

    execSync(`npm install ${extras.join(" ")}`, {
      stdio: "inherit",
    });

    setupShadc();

    setupStateManagement(stateManagement);

    console.log("📦 Copying template...");
    copyTemplates(framework, stateManagement, projectPath, routing);

    console.log("📦 Copying CSS ...");
    copyCssFile(framework, colorPalette, projectPath);

    console.log("\n✅ Project setup complete!");
  } catch (e) {
    console.error("❌ Setup failed");
    if (!isCurrentDir) {
      console.log(`Removing ${projectNameInput} folder..`);
      fs.rmSync(projectPath, { recursive: true, force: true });
    }
  }
};

export { createProject };
