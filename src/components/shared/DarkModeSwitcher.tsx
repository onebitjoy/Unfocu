// import { useThemeContext } from "@/context/ThemeContext";

import { useThemeContext } from "@/context"

const DarkModeSwitcher = () => {

  const { isDark, toggleTheme } = useThemeContext()
  const label = isDark ? "Light Mode 🌼" : "Dark Mode 🪻"
  return (
    <button
      className="w-full text-start"
      onClick={toggleTheme}>
      <h4 className="hidden md:block">{label}</h4>
    </button>
  )
}

export default DarkModeSwitcher;
