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
    execSync(
      `npx create-next-app@latest ${projectNameInput} --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias @/*`,
      { stdio: "inherit" }
    );
  } else {
    execSync(
      `npm create vite@latest ${projectNameInput} -- --template react-swc-ts`,
      {
        stdio: "inherit",
      }
    );

    process.chdir(projectPath);

    execSync("npm i", {
      stdio: "inherit",
    });

    console.log("✅ React with TS downlaoded.");

    setupPathResolver(projectPath);

    console.log("Installing Tailwind CSS");
    setupTailwind(projectPath);

    console.log("Installing Routing");
    setupRoute(routing);

    copyViteConfig(routing, projectPath);
  }
};
