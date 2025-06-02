import { Footer } from "@/components/common/Footer/Footer";
import { Header } from "@/components/common/Header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="flex min-h-[calc(100vh-80px-101px)] flex-col sm:min-h-[calc(100vh-80px-65px)]">
          <div className="flex flex-1 items-center">
            <div className="container mx-auto h-full px-4 py-2 ">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
