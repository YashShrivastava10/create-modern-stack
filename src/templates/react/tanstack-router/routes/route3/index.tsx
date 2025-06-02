import { Route3Page } from "@/pages/Route3Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/route3/")({
  component: Route3Page,
});
