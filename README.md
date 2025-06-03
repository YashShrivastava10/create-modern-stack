<div align="center">

<h1>create-modern-stack</h1>

[![npm version](https://badge.fury.io/js/create-modern-stack.svg)](https://badge.fury.io/js/create-modern-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## Overview

`create-modern-stack` is a Command Line Interface (CLI) tool meticulously designed to bootstrap modern frontend applications in seconds. It addresses the common, yet time-consuming, initial setup phase of any new project, which often involves configuring routing, state management, UI libraries like Tailwind CSS and Shadcn/ui, and implementing essential features like dark/light mode.

Why spend 2-3 days on boilerplate when you can have a production-ready foundation in under a minute? This package automates the setup of your chosen framework (React.js or Next.js), complete with a responsive layout (Header, Footer, Body), theme toggling, and other modern development essentials, allowing you to jump straight into building unique features.

---

## Commands to execute

To create a new project in the current directory:

```bash
npx create-modern-stack .
```

To create a new project in a new directory named my-app:

```
npx create-modern-stack my-app
```

Replace my-app with your desired project name.

---

## CLI Interaction

The CLI will guide you through a series of questions to customize your project setup. Here's an overview of the prompts:

<table>
<tr>
<th>Questions Overview</th>
<th>CLI in Action</th>
</tr>
<tr>
<td style="max-width: 400px; font-size: 12px; white-space: pre-wrap; word-wrap: break-word;">
<pre>
[
    {
        type: "text",
        message: "Project name (use '.' to use current directory)",
        default: "my-app",
    },
    {
        type: "select",
        message: "Which framework do you want to use?",
        choices: ["React.js", "Next.js"],
        default: "React.js",
    },
    {
        type: "select",
        message: "Pick a routing library (only applies to React):",
        choices: ["TanStack Router", "React Router"],
        default: "TanStack Router",
    },
    {
        type: "select",
        message: "Select a state management library:",
        choices: ["Zustand", "Redux", "Context/None"],
        default: "Zustand",
    },
    {
        type: "select",
        message: "Choose a color theme:",
        choices: ["Default", "Purple", "Blue", "Red"],
        default: "Default",
    },
    {
        type: "toggle",
        message: "Are you happy with your choices and ready to proceed?",
        choices: ["yes", "no"],
        default: true,
    },
]
</pre>
</td>
<td style="width: 400px; text-align: center;">
  <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/cli.png" alt="CLI Screenshot Placeholder" style="width: 100%; max-width: 400px;"/>
</td>
</tr>
</table>

---

## Features

Based on your selections during the CLI interaction, your new project will come pre-configured with:

- **Choice of Modern Framework:**

  - **React.js:** Set up with Vite for an incredibly fast development server and build process.

  - **Next.js:** Utilizes the App Router for robust server components and modern Next.js features.

- **Efficient Routing:**

  - For React.js: Your choice of TanStack Router or React Router, fully integrated.

  - For Next.js: Leverages the powerful built-in file-system based App Router.

- **Flexible State Management:**

  - **Zustand:** For simple, scalable, and boilerplate-free state management.

  - **Redux Toolkit:** For complex application states, configured with best practices.

  - **React Context API:** If "None" is selected, providing a basic setup for state sharing.

- **Styling with Tailwind CSS:**

  - Tailwind CSS is fully set up and configured, ready for utility-first styling.

  - **Beautiful UI Components with Shadcn/ui:**

  - Shadcn/ui is initialized, allowing you to easily add and customize accessible and well-designed components.

- **Core Responsive Layout:**

  - An in-built responsive **Header** component.

  - An in-built responsive **Footer** component.

  - A designated **Body/Main Content** area.

- **Theme Management:**

  - Integrated **Dark/Light/System mode** toggle, functional out-of-the-box.

  - Your chosen **Color Palette** (Default, Purple, Blue, Red) applied across Shadcn/ui components and Tailwind configuration.

- **Performance Optimizations:**

  - **Lazy Loading / Code Splitting:** Implemented by default (especially with Next.js and Vite for React) to ensure optimal initial load times.

- **Development Tooling:**

  - ESLint and Prettier configured for consistent code quality and formatting.

<!--- **Production-Ready Builds:**

  - Optimized build configurations for deploying your application. -->

---

## Screenshots:

### Desktop Previews

<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/blue-desktop.png" alt="Blue Theme Desktop Preview">
      <br><em>Blue Theme</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/default-desktop.png" alt="Default Theme Desktop Preview">
      <br><em>Default Theme</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/purple-desktop.png" alt="Purple Theme Desktop Preview">
      <br><em>Purple Theme</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/red-desktop.png" alt="Red Theme Desktop Preview">
      <br><em>Red Theme</em>
    </td>
  </tr>
</table>

### Mobile Previews (Purple Theme)

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/purple-mobile-close.png" alt="Purple Theme Mobile Preview - Menu Closed" width="70%">
      <br><em>Mobile - Menu Closed</em>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/YashShrivastava10/create-modern-stack/main/assets/purple-mobile-open.png" alt="Purple Theme Mobile Preview - Menu Open" width="70%">
      <br><em>Mobile - Menu Open</em>
    </td>
  </tr>
</table>

(Screenshots will be added once the visual aspects are finalized)

---

## Keywords:

create-modern-stack, react, nextjs, next.js, react.js, tailwind, tailwindcss, shadcn, shadcn-ui, zustand, redux, tanstack-router, react-router, dark-mode, light-mode, theme-toggle, boilerplate, starter-kit, cli, scaffolding, frontend, web-development, project-generator

---

## Author

**Yash Shrivastava**  
[GitHub](https://github.com/YashShrivastava10) • [Website](portfolio-yash-shrivastava.vercel.app) • [LinkedIn](https://www.linkedin.com/in/yash-shrivastava-7980911bb/)

---

Happy Coding!
