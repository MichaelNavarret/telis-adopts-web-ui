import TextComponent from "../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../context/ThemeProvider";
import styles from "./MasterListHeader.module.scss";
import masterListDefaultBanner from "../../../assets/utils/Banner plunies master list.png";
import BackArrowIcon from "../../../icons/BackArrowIcon";
import { useNavigate } from "react-router";

type MasterListHeaderProps = {
  specieName: string;
  creationType: string;
  masterListBannerUrl: string;
};

const MasterListHeader = (props: MasterListHeaderProps) => {
  const { specieName, creationType, masterListBannerUrl } = props;
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={styles.masterListHeaderContainer}>
      <BackArrowIcon
        iconColor={colors.primary_color}
        className={styles.backArrowButton}
        handleClick={() => navigate(-1)}
      />
      <div className={styles.titleHeaderContainer}>
        <TextComponent
          content={`Masterlist ${specieName}`}
          hover={false}
          animation={false}
          fontSize="x-large"
          letterSpacing="15px"
          colorText={colors.text_02_color}
        />
        <TextComponent
          content={`${creationType}`}
          hover={false}
          animation={false}
          letterSpacing="10px"
          colorText={colors.text_03_color}
          fontSize="x-large"
        />
      </div>
      <img
        src={
          masterListBannerUrl ? masterListBannerUrl : masterListDefaultBanner
        }
        alt="master-list-banner"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default MasterListHeader;
