import { characters } from "../constants/characters";

export const getMainCharacter = (speciesCode: string) => {
  switch (speciesCode) {
    case "lanies":
      return characters.lanies;
    case "plunies":
      return characters.plunies;
    case "spectralumen":
      return characters.spectralumen;
    case "cloudystars":
      return characters.cloudystars;
    default:
      return characters.lanies;
  }
};
