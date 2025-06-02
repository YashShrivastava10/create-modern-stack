import { Route2Page } from "@/pages/Route2Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/route2/")({
  component: Route2Page,
});
