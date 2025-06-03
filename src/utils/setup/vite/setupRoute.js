import { execPromise } from "../../execPromise.js";

export const setupRoute = async (routing) => {
  if (routing === "tanstack-router") {
    await execPromise("npm install @tanstack/react-router", { stdio: "pipe" });
    await execPromise("npm install -D @tanstack/router-plugin", {
      stdio: "pipe",
    });
  } else if (routing === "react-router") {
    await execPromise("npm install react-router", { stdio: "pipe" });
  }
};
