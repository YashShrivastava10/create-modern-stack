import { Footer } from "@/components/common/Footer/Footer";
import { Header } from "@/components/common/Header/Header";
import SEO from "@/components/common/SEO";
import NotFound from "@/pages/NotFoundPage";
import ReduxProvider from "@/providers/ReduxProvider";
import { ThemeInitializer } from "@/providers/ThemeInitializer";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  loader: () => void 0,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <ReduxProvider>
      <>
        <ThemeInitializer />
        <SEO />
        <Header />
        <main className="flex min-h-[calc(100vh-80px-101px)] flex-col sm:min-h-[calc(100vh-80px-65px)]">
          <div className="flex flex-1 items-center">
            <div className="container mx-auto h-full px-4 py-2 ">
              <Outlet />
            </div>
          </div>
        </main>
        <Footer />
      </>
    </ReduxProvider>
  );
}
