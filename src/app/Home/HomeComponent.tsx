import { useQuery } from "react-query";
import { Button } from "../../components";
import { useTheme } from "../../context/ThemeProvider";
import ImageExpositor from "../Specie/components/ImageExpositor";
import styles from "./HomeComponent.module.scss";
import { getSpecie } from "../../api/species";

const HomeComponent = () => {
  const { character } = useTheme();

  const { data: specieInfo } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(localStorage.getItem("specieId") || "");
    },
  });

  return (
    <div className={styles.mainContainer}>
      <img
        src={character}
        alt="character"
        className={styles.lanniesCharacter}
      />
      <ImageExpositor
        src={specieInfo?.logoUrl || ""}
        alt="logo"
        disabledHover={true}
      />
      <div className={styles.buttonsContainer}>
        <Button disabled> HISTORY </Button>
        <Button disabled> GUIDE </Button>
        <Button> MASTER LIST </Button>
        <Button disabled> ADOPTS OPEN </Button>
        <Button disabled> FAQ / TOS </Button>
        <Button disabled> TRADE CENTER </Button>
      </div>
    </div>
  );
};

export default HomeComponent;
