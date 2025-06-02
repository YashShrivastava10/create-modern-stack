import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { ROUTES } from "@/constants";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Menu, RouteIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: ROUTES.HOME, icon: Home },
  { label: "Route 2", href: ROUTES.ROUTE2, icon: RouteIcon },
  { label: "Route 3", href: ROUTES.ROUTE3, icon: RouteIcon },
  { label: "Route 4", href: ROUTES.ROUTE4, icon: RouteIcon },
];

export const Navigation = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <nav className="bg-primary/10 hidden list-none items-center rounded-full p-2 sm:flex md:p-1 lg:p-1.5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.href}
              key={item.label}
              className={`text-muted-foreground relative flex gap-2 px-3 py-3 text-sm font-medium md:px-2 md:py-2 lg:px-4 ${
                pathname === item.href && "text-primary-foreground"
              }`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === index && (
                <motion.span
                  layoutId="hovered-nav-item"
                  className="bg-primary/30 absolute inset-0 h-full w-full rounded-full"
                />
              )}
              {pathname === item.href && (
                <motion.span
                  layoutId="selected-nav-item"
                  className="bg-primary absolute inset-0 h-full w-full rounded-full"
                />
              )}
              <Icon className="relative z-10 block size-5 md:hidden xl:block" />
              <li className="relative z-10 hidden md:block xl:block">
                {item.label}
              </li>
            </Link>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild className="block sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center hover:bg-transparent dark:hover:bg-transparent"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only">Yoo</SheetTitle>
        <SheetContent className="flex flex-col gap-4 px-8 py-16">
          <nav className="mt-16 flex list-none flex-col items-start justify-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <SheetClose asChild key={item.label}>
                  <Link
                    to={item.href}
                    className={`text-muted-foreground relative flex gap-2 px-4 py-2 text-sm font-medium ${
                      pathname === item.href && "text-primary-foreground"
                    }`}
                  >
                    {pathname === item.href && (
                      <motion.span
                        layoutId="selected-nav-item"
                        className="bg-primary absolute inset-0 h-full w-full rounded-full"
                      />
                    )}
                    <Icon className="relative z-10 size-5" />
                    <li className="relative z-10">{item.label}</li>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
