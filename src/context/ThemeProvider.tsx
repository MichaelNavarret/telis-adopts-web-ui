import React, { createContext, useContext, useState, ReactNode } from "react";
import { getBackground } from "../constants/backgrounds";
import { getColors } from "../constants/colors";
import { getLogo } from "../constants/logos";

interface ThemeContextProps {
  colors: {
    CTX_TEXT_COLOR: string;
    CTX_BUTTON_COLOR: string;
    CTX_BUBBLE_COLOR: string;
    CTX_BUBBLE_ICON_COLOR: string;
    CTX_CONTAINER_COLOR: string;
    CTX_BUTTON_SHADOW_COLOR: string;
    CTX_TITLE_TEXT_COLOR: string;
    CTX_SECOND_CONTAINER_COLOR: string;
    CTX_BUBBLE_HOME_COLOR: string;
    CTX_MENUBAR_COLOR: string;
    CTX_MENUBAR_HOVER_COLOR: string;
    CTX_TABLE_HEADER_COLOR: string;
    CTX_TABLE_HEADER_TEXT_COLOR: string;
    CTX_TABLE_ROW_HOVER_COLOR: string;
    CTX_TABLE_ROW_HOVER_TEXT_COLOR: string;
    CTX_FORM_CONTAINER_COLOR: string;
    CTX_FORM_TITLE_COLOR: string;
    CTX_BUTTON_SHADOW_COLOR_2: string;
    CTX_FORM_BUTTON_COLOR: string;
    CTX_TABLE_TITLE_COLOR: string;
    CTX_MENUBAR_TEXT_COLOR: string;
    CTX_BORDER_ICON_COLOR: string;
  };
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
  const defaultColors = getColors();
  const defaultBackground = getBackground();
  const defaultLogo = getLogo();
  const [colors, setColors] = useState({
    CTX_TEXT_COLOR: defaultColors.text,
    CTX_BUTTON_COLOR: defaultColors.button,
    CTX_BUBBLE_COLOR: defaultColors.bubble,
    CTX_BUBBLE_ICON_COLOR: defaultColors.bubbleIcon,
    CTX_CONTAINER_COLOR: defaultColors.container,
    CTX_BUTTON_SHADOW_COLOR: defaultColors.buttonShadow,
    CTX_TITLE_TEXT_COLOR: defaultColors.titleText,
    CTX_SECOND_CONTAINER_COLOR: defaultColors.secondContainer,
    CTX_BUBBLE_HOME_COLOR: defaultColors.bubbleHome,
    CTX_MENUBAR_COLOR: defaultColors.menubar,
    CTX_MENUBAR_HOVER_COLOR: defaultColors.menubarHover,
    CTX_TABLE_HEADER_COLOR: defaultColors.tableHeader,
    CTX_TABLE_HEADER_TEXT_COLOR: defaultColors.tableHeaderText,
    CTX_TABLE_ROW_HOVER_COLOR: defaultColors.tableRowHover,
    CTX_TABLE_ROW_HOVER_TEXT_COLOR: defaultColors.tableRowHoverText,
    CTX_FORM_CONTAINER_COLOR: defaultColors.formContainer,
    CTX_FORM_TITLE_COLOR: defaultColors.formTitle,
    CTX_BUTTON_SHADOW_COLOR_2: defaultColors.buttonShadow2,
    CTX_FORM_BUTTON_COLOR: defaultColors.formButton,
    CTX_TABLE_TITLE_COLOR: defaultColors.tableTitle,
    CTX_MENUBAR_TEXT_COLOR: defaultColors.menubarText,
    CTX_BORDER_ICON_COLOR: defaultColors.borderIcon,
  });
  const [background, setBackground] = useState(defaultBackground);
  const [logo, setLogo] = useState(defaultLogo);
  //this method will be call to reload the theme when click in some button
  const reloadTheme = () => {
    const colors = getColors();
    const background = getBackground();
    const logo = getLogo();
    setColors({
      CTX_TEXT_COLOR: colors.text,
      CTX_BUTTON_COLOR: colors.button,
      CTX_BUBBLE_COLOR: colors.bubble,
      CTX_BUBBLE_ICON_COLOR: colors.bubbleIcon,
      CTX_CONTAINER_COLOR: colors.container,
      CTX_BUTTON_SHADOW_COLOR: colors.buttonShadow,
      CTX_TITLE_TEXT_COLOR: colors.titleText,
      CTX_SECOND_CONTAINER_COLOR: colors.secondContainer,
      CTX_BUBBLE_HOME_COLOR: colors.bubbleHome,
      CTX_MENUBAR_COLOR: colors.menubar,
      CTX_MENUBAR_HOVER_COLOR: colors.menubarHover,
      CTX_TABLE_HEADER_COLOR: colors.tableHeader,
      CTX_TABLE_HEADER_TEXT_COLOR: colors.tableHeaderText,
      CTX_TABLE_ROW_HOVER_COLOR: colors.tableRowHover,
      CTX_TABLE_ROW_HOVER_TEXT_COLOR: colors.tableRowHoverText,
      CTX_FORM_CONTAINER_COLOR: colors.formContainer,
      CTX_FORM_TITLE_COLOR: colors.formTitle,
      CTX_BUTTON_SHADOW_COLOR_2: colors.buttonShadow2,
      CTX_FORM_BUTTON_COLOR: colors.formButton,
      CTX_TABLE_TITLE_COLOR: colors.tableTitle,
      CTX_MENUBAR_TEXT_COLOR: colors.menubarText,
      CTX_BORDER_ICON_COLOR: colors.borderIcon,
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
