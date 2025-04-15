import { createContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // the default theme is the browser theme set by user
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
  }, [])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
