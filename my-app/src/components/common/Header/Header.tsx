import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { Link } from "react-router";
import ThemeToggle from "../ThemeToggle";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex h-16 items-center justify-between">
          {/* Logo  */}
          <Link to={ROUTES.HOME} className="text-2xl font-bold">
            Yash
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Call to Action and Theme Toggle */}
          <div className="flex items-center gap-4">
            <Button className="rounded-full">CTA</Button>
            <ThemeToggle />
            {/* <ThemeToggleRedux /> */}
            {/* <ThemeToggleContext /> */}
          </div>
        </div>
      </div>
    </header>
  );
};
