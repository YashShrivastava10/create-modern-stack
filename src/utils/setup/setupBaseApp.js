import chalk from "chalk";
import { execSync } from "child_process";
import { copyViteConfig } from "../copyViteConfig.js";
import { setupPathResolver } from "./vite/setupPathResolver.js";
import { setupRoute } from "./vite/setupRoute.js";
import { setupTailwind } from "./vite/setupTailwind.js";

export const setupBaseApp = (
  framework,
  projectNameInput,
  projectPath,
  routing
) => {
  if (framework === "next") {
    console.log(chalk.cyan("[setup] Initializing Next.js project..."));
    execSync(
      `npx create-next-app@latest ${projectNameInput} --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias @/*`,
      { stdio: "inherit" }
    );
    console.log(chalk.green("[done] Next.js project created successfully.\n"));
    return;
  }

  console.log(
    chalk.cyan("[setup] Initializing Vite + React + TypeScript project...")
  );
  execSync(
    `npm create vite@latest ${projectNameInput} -- --template react-swc-ts`,
    { stdio: "inherit" }
  );
  console.log(chalk.green("[done] Vite project scaffolded.\n"));

  process.chdir(projectPath);

  console.log(chalk.cyan("[install] Installing dependencies..."));
  execSync("npm i", { stdio: "inherit" });
  console.log(chalk.green("[done] Dependencies installed.\n"));

  console.log(chalk.cyan("[alias] Configuring path resolver..."));
  setupPathResolver(projectPath);
  console.log(chalk.green("[done] Path resolver set up.\n"));

  console.log(chalk.cyan("[tailwind] Installing Tailwind CSS..."));
  setupTailwind(projectPath);
  console.log(chalk.green("[done] Tailwind CSS configured.\n"));

  console.log(
    chalk.cyan("[routing] Setting up routing with", chalk.bold(routing) + "...")
  );
  setupRoute(routing);
  console.log(chalk.green(`[done] ${routing} integration complete.\n`));

  console.log(chalk.cyan("[vite] Updating Vite configuration..."));
  copyViteConfig(routing, projectPath);
  console.log(chalk.green("[done] Vite config updated successfully.\n"));
};
