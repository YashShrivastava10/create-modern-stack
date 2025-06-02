import { execSync } from "child_process";

export const setupStateManagement = (stateManagement) => {
  const redux = ["@reduxjs/toolkit", "react-redux"];

  if (stateManagement === "zustand") {
    execSync("npm install zustand", { stdio: "inherit" });
  } else if (stateManagement === "redux") {
    execSync(`npm install ${redux.join(" ")}`, { stdio: "inherit" });
  }
};
