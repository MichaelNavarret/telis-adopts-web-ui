import { useQuery } from "react-query";
import { Button } from "../../components";
import { useTheme } from "../../context/ThemeProvider";
import ImageExpositor from "../Specie/components/ImageExpositor";
import styles from "./HomeComponent.module.scss";
import { getSpecie } from "../../api/species";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const { character } = useTheme();
  const navigate = useNavigate();

  const { data: specieInfo } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(localStorage.getItem("specieId") || "");
    },
  });

  const handleButtonClick = (action: number) => {
    switch (action) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        navigate("/master-list");
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      default:
        break;
    }
  };

  return (
    <>
      <img
        src={specieInfo?.logoUrl || ""}
        alt="logo"
        className={styles.speciesLogoContainer}
      />
      <img
        src={character}
        alt="character"
        className={styles.lanniesCharacter}
      />

      <div className={styles.mainContainer}>
        <div className={styles.buttonsContainer}>
          <Button disabled> HISTORY </Button>
          <Button disabled> GUIDE </Button>
          <Button onClick={() => handleButtonClick(3)}> MASTER LIST </Button>
          <Button disabled> ADOPTS OPEN </Button>
          <Button disabled> FAQ / TOS </Button>
          <Button disabled> TRADE CENTER </Button>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
