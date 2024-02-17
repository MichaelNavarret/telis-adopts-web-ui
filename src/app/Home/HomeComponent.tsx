import { useQuery } from "react-query";
import { Button } from "../../components";
import styles from "./HomeComponent.module.scss";
import { getSpecie } from "../../api/species";
import { useNavigate } from "react-router-dom";
import strings from "../../l10n";
import DialogComponent from "../../components/surfaces/DialogComponent";
import { useEffect, useState } from "react";
import ImageDialog from "./components/ImageDialog";
import FaqsDialog from "./components/FaqsDialog";
import { getMainCharacter } from "../../tools/assets";

const HomeComponent = () => {
  const navigate = useNavigate();
  const [openStory, setOpenStory] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const specieId = localStorage.getItem("specieId") || "";

  const { data: specieInfo } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(specieId);
    },
  });

  useEffect(() => {
    const logo = document.querySelector(
      `.${styles.speciesLogoContainer}`
    ) as HTMLImageElement;
    const character = document.querySelector(
      `.${styles.mainCharacter}`
    ) as HTMLImageElement;
    if (logo && character) {
      logo.style.opacity = "0";
      character.style.opacity = "0";
      setTimeout(() => {
        logo.style.opacity = "1";
        logo.style.transition = "opacity 0.5s";
        character.style.opacity = "1";
        character.style.transition = "opacity 0.5s";
      }, 100);
    }
  }, [specieId]);

  const history = (
    <pre
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "sans-serif",
        fontSize: "18px",
      }}
    >
      {specieInfo?.history}
    </pre>
  );

  const handleButtonClick = (action: number) => {
    switch (action) {
      case 1:
        setOpenStory(true);
        break;
      case 2:
        setOpenGuide(true);
        break;
      case 3:
        navigate("/master-list");
        break;
      case 4:
        break;
      case 5:
        setOpenFaq(true);
        break;
      case 6:
        break;
      default:
        break;
    }
  };

  return (
    <>
      {specieInfo && (
        <>
          <img
            src={specieInfo?.logoUrl || ""}
            alt="logo"
            className={styles.speciesLogoContainer}
          />
          <img
            src={getMainCharacter(specieInfo?.code || "")}
            alt="character"
            className={styles.mainCharacter}
          />
        </>
      )}

      <div className={styles.mainContainer}>
        <div className={styles.buttonsContainer}>
          <Button onClick={() => handleButtonClick(1)}>
            {strings.OPTION_STORY}
          </Button>
          <Button onClick={() => handleButtonClick(2)}> GUIDE </Button>
          <Button onClick={() => handleButtonClick(3)}>
            {strings.OPTION_MASTER_LIST}{" "}
          </Button>
          <Button disabled> ADOPTS OPEN </Button>
          <Button onClick={() => handleButtonClick(5)}> FAQ / TOS </Button>
          <Button disabled> TRADE CENTER </Button>
        </div>
        <DialogComponent
          dialogTitle={strings.OPTION_STORY}
          open={openStory}
          content={history}
          handleClose={() => setOpenStory(false)}
          maxWidth="xl"
        />
        <ImageDialog
          code={specieInfo?.code || ""}
          imageUrl={specieInfo?.guideSheetUrl || ""}
          open={openGuide}
          handleClose={() => setOpenGuide(false)}
        />
        <FaqsDialog
          open={openFaq}
          handleClose={() => setOpenFaq(false)}
          specieId={specieInfo?.id || ""}
        />
      </div>
    </>
  );
};

export default HomeComponent;
