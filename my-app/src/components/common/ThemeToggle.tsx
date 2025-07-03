"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useThemeStore } from "@/hooks";
import { Monitor, Moon, Sun } from "lucide-react";

const ThemeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const Icon = ThemeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="flex items-center gap-2"
          >
            <Sun className="size-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="flex items-center gap-2"
          >
            <Moon className="size-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="flex items-center gap-2"
          >
            <Monitor className="size-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
