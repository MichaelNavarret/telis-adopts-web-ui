import main_logo from "../assets/logos/main.png";
import lanies_logo from "../assets/logos/lanies.png";
import cloudy_stars_logo from "../assets/logos/cloudyStars.png";
import plunies_logo from "../assets/logos/plunies.png";
import spectraLumen_logo from "../assets/logos/spectraLumen.png";
import { getCurrentSpecie } from "../tools/commons";

export const MAIN_LOGO = main_logo;
export const LANIES_LOGO = lanies_logo;
export const CLOUDY_STARS_LOGO = cloudy_stars_logo;
export const PLUNIES_LOGO = plunies_logo;
export const SPECTRALUMEN_LOGO = spectraLumen_logo;

export const getLogo = () => {
  const species = getCurrentSpecie();
  switch (species) {
    case "lanies":
      return LANIES_LOGO;
    case "cloudystars":
      return CLOUDY_STARS_LOGO;
    case "plunies":
      return PLUNIES_LOGO;
    case "spectralumen":
      return SPECTRALUMEN_LOGO;
    default:
      return MAIN_LOGO;
  }
};
