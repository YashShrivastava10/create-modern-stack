import { execPromise } from "../execPromise.js";

export const setupShadcn = async () => {
  await execPromise("npx shadcn@latest init --base-color neutral -s", {
    stdio: "pipe",
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
  await execPromise(`npx shadcn@latest add ${components.join(" ")} -s -y`, {
    stdio: "pipe",
  });
};
