// ---------------------------------------------------- MAIN COLORS ----------------------------------------------------
export const MAIN_TEXT_COLOR = "#FEF1DF";
export const MAIN_TITLE_TEXT_COLOR = "#F08F86";
export const MAIN_BUTTON_COLOR = "#F08F86";
export const MAIN_BUBBLE_COLOR = "#F08F86";
export const MAIN_BUBBLE_ICON_COLOR = "#FEF1DF";
export const MAIN_CONTAINER_COLOR = "#FFBFA9";
export const MAIN_SECOND_CONTAINER_COLOR = "#FEF1DF";
export const MAIN_BUTTON_SHADOW_COLOR = "#B37B6F";

export const mainColors = {
  text: MAIN_TEXT_COLOR,
  titleText: MAIN_TITLE_TEXT_COLOR,
  button: MAIN_BUTTON_COLOR,
  bubble: MAIN_BUBBLE_COLOR,
  bubbleIcon: MAIN_BUBBLE_ICON_COLOR,
  container: MAIN_CONTAINER_COLOR,
  secondContainer: MAIN_SECOND_CONTAINER_COLOR,
  buttonShadow: MAIN_BUTTON_SHADOW_COLOR,
};

// ---------------------------------------------------- LANNIES COLORS ----------------------------------------------------
export const LANNIES_TEXT_COLOR = "#FEF1DF";
export const LANNIES_TITLE_TEXT_COLOR = "#F682A0";
export const LANNIES_BUTTON_COLOR = "#F682A0";
export const LANNIES_BUBBLE_COLOR = "#F682A0";
export const LANNIES_BUBBLE_ICON_COLOR = "#FEF1DF";
export const LANNIES_CONTAINER_COLOR = "#F682A0";
export const LANNIES_SECOND_CONTAINER_COLOR = "#FEF1DF";
export const LANNIES_BUTTON_SHADOW_COLOR = "#F682A0";

export const lanniesColors = {
  text: LANNIES_TEXT_COLOR,
  titleText: LANNIES_TITLE_TEXT_COLOR,
  button: LANNIES_BUTTON_COLOR,
  bubble: LANNIES_BUBBLE_COLOR,
  bubbleIcon: LANNIES_BUBBLE_ICON_COLOR,
  container: LANNIES_CONTAINER_COLOR,
  secondContainer: LANNIES_SECOND_CONTAINER_COLOR,
  buttonShadow: LANNIES_BUTTON_SHADOW_COLOR,
};

// ---------------------------------------------------- SPECTRALUMEN COLORS ----------------------------------------------------
export const SPECTRALUMEN_TEXT_COLOR = "##F2F5FE";
export const SPECTRALUMEN_TITLE_TEXT_COLOR = "#F682A0";
export const SPECTRALUMEN_BUTTON_COLOR = "#FB77FE";
export const SPECTRALUMEN_BUBBLE_COLOR = "#010000";
export const SPECTRALUMEN_BUBBLE_ICON_COLOR = "#F2F5FE";
export const SPECTRALUMEN_CONTAINER_COLOR = "##FB77FE";
export const SPECTRALUMEN_SECOND_CONTAINER_COLOR = "#F2F5FE";
export const SPECTRALUMEN_BUTTON_SHADOW_COLOR = "#F682A0";

export const spectraLumenColors = {
  text: SPECTRALUMEN_TEXT_COLOR,
  titleText: SPECTRALUMEN_TITLE_TEXT_COLOR,
  button: SPECTRALUMEN_BUTTON_COLOR,
  bubble: SPECTRALUMEN_BUBBLE_COLOR,
  bubbleIcon: SPECTRALUMEN_BUBBLE_ICON_COLOR,
  container: SPECTRALUMEN_CONTAINER_COLOR,
  secondContainer: SPECTRALUMEN_SECOND_CONTAINER_COLOR,
  buttonShadow: SPECTRALUMEN_BUTTON_SHADOW_COLOR,
};

// ---------------------------------------------------- CLOUDYSTARS COLORS ----------------------------------------------------
export const CLOUDYSTARS_TEXT_COLOR = "#FFF0E2";
export const CLOUDYSTARS_TITLE_TEXT_COLOR = "#97D4E9";
export const CLOUDYSTARS_BUTTON_COLOR = "#97D4E9";
export const CLOUDYSTARS_BUBBLE_COLOR = "#80B7E4";
export const CLOUDYSTARS_BUBBLE_ICON_COLOR = "#FFF0E2";
export const CLOUDYSTARS_CONTAINER_COLOR = "#97D4E9";
export const CLOUDYSTARS_SECOND_CONTAINER_COLOR = "#FFFFFF";
export const CLOUDYSTARS_BUTTON_SHADOW_COLOR = "#97D4E9";

export const cloudystarsColors = {
  text: CLOUDYSTARS_TEXT_COLOR,
  titleText: CLOUDYSTARS_TITLE_TEXT_COLOR,
  button: CLOUDYSTARS_BUTTON_COLOR,
  bubble: CLOUDYSTARS_BUBBLE_COLOR,
  bubbleIcon: CLOUDYSTARS_BUBBLE_ICON_COLOR,
  container: CLOUDYSTARS_CONTAINER_COLOR,
  secondContainer: CLOUDYSTARS_SECOND_CONTAINER_COLOR,
  buttonShadow: CLOUDYSTARS_BUTTON_SHADOW_COLOR,
};

// ---------------------------------------------------- PLUNIES COLORS ----------------------------------------------------
export const PLUNIES_TEXT_COLOR = "#FEF1DF";
export const PLUNIES_TITLE_TEXT_COLOR = "#C35578";
export const PLUNIES_BUTTON_COLOR = "#C35578";
export const PLUNIES_BUBBLE_COLOR = "#77072D";
export const PLUNIES_BUBBLE_ICON_COLOR = "#FEF1DF";
export const PLUNIES_CONTAINER_COLOR = "#C35578";
export const PLUNIES_SECOND_CONTAINER_COLOR = "#FEF1DF";
export const PLUNIES_BUTTON_SHADOW_COLOR = "#C35578";

export const pluniesColors = {
  text: PLUNIES_TEXT_COLOR,
  titleText: PLUNIES_TITLE_TEXT_COLOR,
  button: PLUNIES_BUTTON_COLOR,
  bubble: PLUNIES_BUBBLE_COLOR,
  bubbleIcon: PLUNIES_BUBBLE_ICON_COLOR,
  container: PLUNIES_CONTAINER_COLOR,
  secondContainer: PLUNIES_SECOND_CONTAINER_COLOR,
  buttonShadow: PLUNIES_BUTTON_SHADOW_COLOR,
};

// ---------------------------------------------------- GET COLORS ----------------------------------------------------

export function getColors() {
  const species = localStorage.getItem("specie");
  switch (species) {
    case "lannies":
      return lanniesColors;
    case "spectralumen":
      return spectraLumenColors;
    case "cloudystars":
      return cloudystarsColors;
    case "plunies":
      return pluniesColors;
    default:
      return mainColors;
  }
}
