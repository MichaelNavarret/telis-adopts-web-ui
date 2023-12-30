import { Button } from "../../components";
import { useTheme } from "../../context/ThemeProvider";
import { getCurrentSpecie } from "../../tools/commons";
import ImageExpositor from "../Specie/components/ImageExpositor";
import styles from "./HomeComponent.module.scss";

const HomeComponent = () => {
  const { character, logo } = useTheme();

  const getClassName = () => {
    const currentSpecie = getCurrentSpecie();
    switch (currentSpecie) {
      case "spectralumen":
        return styles.spectraLumenLogo;
      default:
        return styles.logo;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <img
        src={character}
        alt="character"
        className={styles.lanniesCharacter}
      />
      <ImageExpositor src={logo} alt="logo" classNameImage={getClassName()} />
      <div className={styles.buttonsContainer}>
        <Button> HISTORY </Button>
        <Button> GUIDE </Button>
        <Button> MASTER LIST </Button>
        <Button> ADOPTS OPEN </Button>
        <Button> FAQ / TOS </Button>
        <Button> TRADE CENTER </Button>
      </div>
    </div>
  );
};

export default HomeComponent;
