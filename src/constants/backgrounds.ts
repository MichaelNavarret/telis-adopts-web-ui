import main_background from "../assets/backgrounds/bg_main.png";
import lanies_background from "../assets/backgrounds/bg_lanies.png";
import spectralumen_background from "../assets/backgrounds/bg_spectralumen.png";
import cloudystars_background from "../assets/backgrounds/bg_cloudystars.png";
import plunies_background from "../assets/backgrounds/bg_plunies.png";
import { getCurrentSpecie } from "../tools/commons";

export const MAIN_BACKGROUND = main_background;
export const LANIES_BACKGROUND = lanies_background;
export const SPECTRALUMEN_BACKGROUND = spectralumen_background;
export const CLOUDYSTARS_BACKGROUND = cloudystars_background;
export const PLUNIES_BACKGROUND = plunies_background;

export const speciesBackgrounds = {
  main: MAIN_BACKGROUND,
  lanies: LANIES_BACKGROUND,
  spectralumen: SPECTRALUMEN_BACKGROUND,
  cloudystars: CLOUDYSTARS_BACKGROUND,
  plunies: PLUNIES_BACKGROUND,
};

export function getBackground() {
  const species = getCurrentSpecie();
  switch (species) {
    case "lanies":
      return LANIES_BACKGROUND;
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
