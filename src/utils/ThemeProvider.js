import React, { useContext, useEffect, useState } from "react";
import { DarkModeColorTheme, LightModeColorTheme } from "./theme";
import { useColorScheme } from "react-native";

export const ThemeContext = React.createContext({
  dark: false,
  colorsSchema: LightModeColorTheme,
  setScheme: () => {},
});

export const ThemeProvider = (props) => {
  const colorSchema = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorSchema === "dark");

  const defaultTheme = {
    dark: isDarkMode,
    colorsSchema: isDarkMode ? DarkModeColorTheme : LightModeColorTheme,
    setScheme: (colorSchema) => {
      isDarkMode(colorSchema === "dark");
    },
  };
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeCustom = () => useContext(ThemeContext);
