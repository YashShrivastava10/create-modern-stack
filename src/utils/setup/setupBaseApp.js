import { execPromise } from "../execPromise.js";
import { setupTailwind } from "./vite/setupTailwind.js"; // Assuming this is also async or made async

export const setupBaseApp = async (
  framework,
  projectNameInput,
  projectPath
) => {
  if (framework === "next") {
    await execPromise(
      `npx create-next-app@latest ${projectNameInput} --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*"`,
      { stdio: "pipe" }
    );
  } else {
    await execPromise(
      `npm create vite@latest ${projectNameInput} -- --template react-swc-ts`,
      { stdio: "pipe" }
    );

    process.chdir(projectPath);

    await execPromise("npm install", { stdio: "pipe" });

    await setupTailwind(projectPath);
  }
};
