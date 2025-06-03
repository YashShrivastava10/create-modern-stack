"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { RootState } from "@/store";
import { setTheme } from "@/store/slice/themeSlice";
import { Monitor, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
const ThemeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export default function ThemeToggle() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.theme);

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
            onClick={() => dispatch(setTheme("light"))}
            className="flex items-center gap-2"
          >
            <Sun className="size-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTheme("dark"))}
            className="flex items-center gap-2"
          >
            <Moon className="size-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setTheme("system"))}
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
