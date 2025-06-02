import { execSync } from "child_process";

export const setupShadcn = () => {
  execSync("npx shadcn@latest init --base-color neutral --force --yes", {
    stdio: "inherit",
  });

  const components = [
    "button",
    "card",
    "input",
    "label",
    "dialog",
    "badge",
    "dropdown-menu",
    "sheet",
    "sonner",
    "tabs",
  ];
  execSync(`npx shadcn@latest add ${components.join(" ")} --yes`, {
    stdio: "inherit",
  });
};
