import { execPromise } from "../execPromise.js";

export const setupStateManagement = async (stateManagement) => {
  const redux = ["@reduxjs/toolkit", "react-redux"];

  if (stateManagement === "zustand") {
    await execPromise("npm install zustand", { stdio: "pipe" });
  } else if (stateManagement === "redux") {
    await execPromise(`npm install ${redux.join(" ")}`, { stdio: "pipe" });
  }
};
