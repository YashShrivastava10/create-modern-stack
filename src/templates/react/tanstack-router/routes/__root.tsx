import { Footer } from "@/components/common/Footer/Footer";
import { Header } from "@/components/common/Header/Header";
import NotFound from "@/pages/NotFoundPage";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  loader: () => void 0,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-80px-101px)] flex-grow sm:h-[calc(100vh-80px-65px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
