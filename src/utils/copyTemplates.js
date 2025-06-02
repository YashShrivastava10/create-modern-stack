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

  // Remove old src if exists
  if (fsExtra.existsSync(destinationSrc)) {
    console.log(`Removing existing directory: ${destinationSrc}`);
    fsExtra.removeSync(destinationSrc);
  }

  // Create new empty src
  fsExtra.ensureDirSync(destinationSrc);

  // Copy contents from base (not the base folder) directly into /src
  fsExtra.readdirSync(baseTemplatePath).forEach((item) => {
    console.log(item);
    const srcItemPath = path.join(baseTemplatePath, item);
    if (item === "ui") {
      fsExtra.copySync(
        srcItemPath,
        path.join(destinationSrc, "components", "ui")
      );
    } else {
      const destItemPath = path.join(destinationSrc, item);
      fsExtra.copySync(srcItemPath, destItemPath);
    }
  });

  // Add routing and overwrite __root.tsx from selected stateManagement
  if (framework === "react") {
    const routeTemplatePath = path.join(templateRoot, routing);

    // Copying components
    fsExtra.copySync(
      path.join(routeTemplatePath, "components"),
      path.join(destinationSrc, "components")
    );

    // Copying main.tsx
    fsExtra.copySync(
      path.join(routeTemplatePath, "main.tsx"),
      path.join(destinationSrc, "main.tsx")
    );

    // Tanstack Router
    if (routing === "tanstack-router") {
      // Copying routes
      fsExtra.copySync(
        path.join(routeTemplatePath, "routes"),
        path.join(destinationSrc, "routes")
      );

      // Copying __root.tsx
      fsExtra.copySync(
        path.join(routeTemplatePath, `${stateManagement}-__root.tsx`),
        path.join(destinationSrc, "routes", "__root.tsx")
      );
    }

    // React Router
    else if (routing === "react-router") {
      // Copying __root.tsx
      fsExtra.copySync(
        path.join(routeTemplatePath, `${stateManagement}-app.tsx`),
        path.join(destinationSrc, "App.tsx")
      );
    }
  }
  // Overwrite layout.tsx from selected stateManagement
  if (framework === "next") {
    fsExtra.copySync(
      path.join(statePath, "layout.tsx"),
      path.join(destinationSrc, "app", "layout.tsx")
    );
  }

  // Copy ThemeToggle.tsx into components/common
  fsExtra.copySync(
    path.join(statePath, "ThemeToggle.tsx"),
    path.join(destinationSrc, "components", "common", "ThemeToggle.tsx")
  );

  // Conditionally copy state-specific folders
  if (stateManagement === "redux") {
    fsExtra.copySync(
      path.join(statePath, "store"),
      path.join(destinationSrc, "store")
    );
    fsExtra.copySync(
      path.join(statePath, "providers"),
      path.join(destinationSrc, "providers")
    );
  } else if (stateManagement === "zustand") {
    fsExtra.copySync(
      path.join(statePath, "hooks"),
      path.join(destinationSrc, "hooks")
    );
  } else if (stateManagement === "context") {
    fsExtra.copySync(
      path.join(statePath, "context"),
      path.join(destinationSrc, "context")
    );
  }

  console.log(`✅ Template with ${stateManagement} setup copied successfully.`);
};

export { copyTemplates };
