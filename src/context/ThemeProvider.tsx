import React, { createContext, useContext, useState, ReactNode } from "react";
import { getBackground } from "../constants/backgrounds";
import { getColors } from "../constants/colors";
import { getLogo } from "../constants/logos";
import { Colors } from "../types/commons";

interface ThemeContextProps {
  colors: Colors;
  background: string;
  setColors: React.Dispatch<React.SetStateAction<ThemeContextProps["colors"]>>;
  setBackground: React.Dispatch<
    React.SetStateAction<ThemeContextProps["background"]>
  >;
  logo: string;
  setLogo: React.Dispatch<React.SetStateAction<ThemeContextProps["logo"]>>;
  reloadTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const DEFAULT = getColors();
  const defaultBackground = getBackground();
  const defaultLogo = getLogo();
  const [colors, setColors] = useState({
    primary_color: DEFAULT.primary_color,
    secondary_color: DEFAULT.secondary_color,
    selected_color: DEFAULT.selected_color,
    shadow_color: DEFAULT.shadow_color,
    text_color: DEFAULT.text_color,
    text_02_color: DEFAULT.text_02_color,
    text_03_color: DEFAULT.text_03_color,
  });
  const [background, setBackground] = useState(defaultBackground);
  const [logo, setLogo] = useState(defaultLogo);
  //this method will be call to reload the theme when click in some button
  const reloadTheme = () => {
    const COLORS = getColors();
    const background = getBackground();
    const logo = getLogo();
    setColors({
      primary_color: COLORS.primary_color,
      secondary_color: COLORS.secondary_color,
      selected_color: COLORS.selected_color,
      shadow_color: COLORS.shadow_color,
      text_color: COLORS.text_color,
      text_02_color: COLORS.text_02_color,
      text_03_color: COLORS.text_03_color,
    });
    setBackground(background);
    setLogo(logo);
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        background,
        setColors,
        setBackground,
        logo,
        setLogo,
        reloadTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
