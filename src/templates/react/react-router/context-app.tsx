import { Outlet } from "react-router";
import { Footer } from "./components/common/Footer/Footer";
import { Header } from "./components/common/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";

export const App = () => {
  return (
    <ThemeProvider>
      <>
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
    </ThemeProvider>
  );
};
