import { execSync } from "child_process";

export const setupRoute = (routing) => {
  if (routing === "tanstack-router") {
    execSync("npm install @tanstack/react-router", { stdio: "inherit" });
    execSync("npm install -D @tanstack/router-plugin", { stdio: "inherit" });
  } else if (routing === "react-router") {
    execSync("npm install react-router", { stdio: "inherit" });
  }
};
