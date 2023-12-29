import main_background from "../assets/backgrounds/bg_main.png";
import lannies_background from "../assets/backgrounds/bg_lannies.png";
import spectralumen_background from "../assets/backgrounds/bg_spectralumen.png";
import cloudystars_background from "../assets/backgrounds/bg_cloudystars.png";
import plunies_background from "../assets/backgrounds/bg_plunies.png";

export const MAIN_BACKGROUND = main_background;
export const LANNIES_BACKGROUND = lannies_background;
export const SPECTRALUMEN_BACKGROUND = spectralumen_background;
export const CLOUDYSTARS_BACKGROUND = cloudystars_background;
export const PLUNIES_BACKGROUND = plunies_background;

export const speciesBackgrounds = {
  main: MAIN_BACKGROUND,
  lannies: LANNIES_BACKGROUND,
  spectralumen: SPECTRALUMEN_BACKGROUND,
  cloudystars: CLOUDYSTARS_BACKGROUND,
  plunies: PLUNIES_BACKGROUND,
};

export function getBackground() {
  const species = localStorage.getItem("specie");
  switch (species) {
    case "lannies":
      return LANNIES_BACKGROUND;
    case "spectralumen":
      return SPECTRALUMEN_BACKGROUND;
    case "cloudystars":
      return CLOUDYSTARS_BACKGROUND;
    case "plunies":
      return PLUNIES_BACKGROUND;
    default:
      return MAIN_BACKGROUND;
  }
}
