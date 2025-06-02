import { validateProjectName } from "../utils/validateProjectName.js";

export const questions = [
  {
    type: "text",
    name: "projectName",
    message: "Project name (use '.' to use current directory)",
    initial: "my-app",
    validate: validateProjectName,
  },
  {
    type: "select",
    name: "framework",
    message: "Which framework do you want to use?",
    choices: [
      { title: "React.js", value: "react" },
      { title: "Next.js", value: "next" },
    ],
    initial: 0,
  },
  {
    type: (prev, values) => (values.framework === "react" ? "select" : null),
    name: "routing",
    message: "Pick a routing library (only applies to React):",
    choices: [
      { title: "TanStack Router", value: "tanstack-router" },
      { title: "React Router", value: "react-router" },
    ],
    initial: 0,
  },
  {
    type: "select",
    name: "stateManagement",
    message: "Select a state management library:",
    choices: [
      { title: "Zustand (simple and lightweight)", value: "zustand" },
      { title: "Redux (for complex state)", value: "redux" },
      { title: "None", value: "context" },
    ],
    initial: 0,
  },
  {
    type: "select",
    name: "colorPalette",
    message: "Choose a color theme:",
    choices: [
      { title: "Default", value: "default" },
      { title: "Purple", value: "purple" },
      { title: "Blue", value: "blue" },
      { title: "Red", value: "red" },
    ],
    initial: 1,
  },
  {
    type: "toggle",
    name: "confirmSetup",
    message: "Are you happy with your choices and ready to proceed?",
    initial: true,
    active: "yes",
    inactive: "no",
  },
];
