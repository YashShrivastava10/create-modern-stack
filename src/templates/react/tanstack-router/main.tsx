import ErrorPage from "@/pages/ErrorPage.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Loader } from "./components/common/Loader.tsx";
import "./index.css";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  defaultPendingComponent: Loader,
  defaultErrorComponent: ErrorPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
