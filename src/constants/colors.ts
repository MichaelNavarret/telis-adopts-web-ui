import { getCurrentSpecie } from "../tools/commons";
import { cloudystarsColors } from "./colors/cloudyStarsColors";
import { laniesColors } from "./colors/laniesColors";
import { mainColors } from "./colors/mainColors";
import { pluniesColors } from "./colors/pluniesColors";
import { spectraLumenColors } from "./colors/spectraLumenColors";

export function getColors() {
  const species = getCurrentSpecie();
  console.log("SP: ", species);
  switch (species) {
    case "lanies":
      return laniesColors;
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

export function getColorsBySpecie(specie: string) {
  switch (specie.toLocaleLowerCase()) {
    case "lanies":
      return laniesColors;
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
