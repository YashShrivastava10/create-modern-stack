import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyTemplates = (framework, stateManagement, projectPath, routing) => {
  const commonTemplate = path.join(__dirname, "..", "templates", "common");
  const templateRoot = path.join(__dirname, "..", "templates", framework);
  const baseTemplatePath = path.join(templateRoot, "base");
  const statePath = path.join(
    commonTemplate,
    "state",
    stateManagement.toLowerCase()
  );
  const destinationSrc = path.join(projectPath, "src");

  // Clean up existing src
  if (fsExtra.existsSync(destinationSrc)) {
    console.log(
      `${chalk.gray("[clean]")} Removing existing directory → ${chalk.dim(
        destinationSrc
      )}`
    );
    fsExtra.removeSync(destinationSrc);
  }

  fsExtra.ensureDirSync(destinationSrc);

  // Copy base files
  fsExtra.readdirSync(baseTemplatePath).forEach((item) => {
    const srcItemPath = path.join(baseTemplatePath, item);
    const destItemPath =
      item === "ui"
        ? path.join(destinationSrc, "components", "ui")
        : path.join(destinationSrc, item);

    fsExtra.copySync(srcItemPath, destItemPath);
  });

  // Routing for React
  if (framework === "react") {
    const routeTemplatePath = path.join(templateRoot, routing);

    fsExtra.copySync(
      path.join(routeTemplatePath, "components"),
      path.join(destinationSrc, "components")
    );
    fsExtra.copySync(
      path.join(routeTemplatePath, "main.tsx"),
      path.join(destinationSrc, "main.tsx")
    );

    if (routing === "tanstack-router") {
      fsExtra.copySync(
        path.join(routeTemplatePath, "routes"),
        path.join(destinationSrc, "routes")
      );
      fsExtra.copySync(
        path.join(routeTemplatePath, `${stateManagement}-__root.tsx`),
        path.join(destinationSrc, "routes", "__root.tsx")
      );
    }

    if (routing === "react-router") {
      fsExtra.copySync(
        path.join(routeTemplatePath, `${stateManagement}-app.tsx`),
        path.join(destinationSrc, "App.tsx")
      );
    }
  }

  // Layout override for Next.js
  if (framework === "next") {
    fsExtra.copySync(
      path.join(statePath, "layout.tsx"),
      path.join(destinationSrc, "app", "layout.tsx")
    );
  }

  // Theme toggle
  fsExtra.copySync(
    path.join(statePath, "ThemeToggle.tsx"),
    path.join(destinationSrc, "components", "common", "ThemeToggle.tsx")
  );

  // State-specific folders
  switch (stateManagement) {
    case "redux":
      fsExtra.copySync(
        path.join(statePath, "store"),
        path.join(destinationSrc, "store")
      );
      fsExtra.copySync(
        path.join(statePath, "providers"),
        path.join(destinationSrc, "providers")
      );
      break;
    case "zustand":
      fsExtra.copySync(
        path.join(statePath, "hooks"),
        path.join(destinationSrc, "hooks")
      );
      break;
    case "context":
      fsExtra.copySync(
        path.join(statePath, "context"),
        path.join(destinationSrc, "context")
      );
      break;
  }

  console.log(
    `${chalk.green("[success]")} Project initialized with ${chalk.cyan(
      stateManagement
    )} state and ${chalk.cyan(routing)} routing for ${chalk.bold(framework)}.\n`
  );
};

export { copyTemplates };
