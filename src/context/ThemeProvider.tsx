import React, { createContext, useContext, useState, ReactNode } from "react";
import { getBackground } from "../constants/backgrounds";
import { getColors } from "../constants/colors";
import { getLogo } from "../constants/logos";
import {
  DEFAULT_PRIMARY,
  DEFAULT_SECONDARY,
  DEFAULT_SELECTED,
  DEFAULT_SHADOW,
  DEFAULT_TEXT,
  DEFAULT_TEXT_02,
  DEFAULT_TEXT_03,
} from "../constants/colors/mainColors";
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
  const defaultBackground = getBackground();
  const defaultLogo = getLogo();
  const [colors, setColors] = useState({
    primary_color: DEFAULT_PRIMARY,
    secondary_color: DEFAULT_SECONDARY,
    selected_color: DEFAULT_SELECTED,
    shadow_color: DEFAULT_SHADOW,
    text_color: DEFAULT_TEXT,
    text_02_color: DEFAULT_TEXT_02,
    text_03_color: DEFAULT_TEXT_03,
  });
  const [background, setBackground] = useState(defaultBackground);
  const [logo, setLogo] = useState(defaultLogo);
  //this method will be call to reload the theme when click in some button
  const reloadTheme = () => {
    const colors = getColors();
    const background = getBackground();
    const logo = getLogo();
    setColors({
      primary_color: colors.primary_color,
      secondary_color: colors.secondary_color,
      selected_color: colors.selected_color,
      shadow_color: colors.shadow_color,
      text_color: colors.text_color,
      text_02_color: colors.text_02_color,
      text_03_color: colors.text_03_color,
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
