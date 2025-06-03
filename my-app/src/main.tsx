import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App } from "./App.tsx";
import "./index.css";
import { HomePage } from "./pages/HomePage.tsx";
import { Route2Page } from "./pages/Route2Page.tsx";
import { Route3Page } from "./pages/Route3Page.tsx";
import { Route4Page } from "./pages/Route4Page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/route2",
        Component: Route2Page,
      },
      {
        path: "/route3",
        Component: Route3Page,
      },
      {
        path: "/route4",
        Component: Route4Page,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
