import { useQuery } from "react-query";
import { Button } from "../../components";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./HomeComponent.module.scss";
import { getSpecie } from "../../api/species";
import { useNavigate } from "react-router-dom";
import strings from "../../l10n";
import DialogComponent from "../../components/surfaces/DialogComponent";
import { useState } from "react";
import ImageDialog from "./components/ImageDialog";
import FaqsDialog from "./components/FaqsDialog";

const HomeComponent = () => {
  const { character } = useTheme();
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
