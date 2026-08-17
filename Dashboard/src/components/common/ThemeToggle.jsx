
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        // <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
        <FiSun  className=" size-5" />
      ) : (
        // <Moon className="absolute size-5   transition-all dark:rotate-0 scale-100" />
        <FaRegMoon className=" size-5" />
      )}
    </Button>
  );
}
