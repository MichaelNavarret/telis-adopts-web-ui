import { useQuery } from "react-query";
import TextComponent from "../../../components/TextComponents/TextComponent";
import styles from "./SpeciesDetails.module.scss";
import { getSpecie } from "../../../api/species";
import { useTheme } from "../../../context/ThemeProvider";
import SectionComponent from "../../../components/SectionComponent/SectionComponent";
import SectionField from "../../../components/SectionComponent/SectionField";
import strings from "../../../l10n";
import ImageSection from "./components/ImageSection";
import HistorySection from "./components/HistorySection";
import SpecieFormSection from "./components/SpecieFormSection";

type SpeciesDetailsProps = {
  specieId: string;
};

const SpeciesDetails = (props: SpeciesDetailsProps) => {
  const { specieId } = props;
  const { colors } = useTheme();

  const { data: specieInfo, isLoading: isSpecieInfoLoading } = useQuery({
    queryKey: ["specie", specieId],
    queryFn: () => {
      return getSpecie(specieId);
    },
  });

  return (
    <>
      <div className={styles.mainContainer}>
        {/* //-------------------------------------------------------------------------------------- Header */}
        <div className={styles.headerContainer}>
          <TextComponent
            content={specieInfo?.name || ""}
            animation={false}
            hover={false}
            fontSize="xx-large"
            colorText={colors.CTX_FORM_TITLE_COLOR}
          />
        </div>
        {/* //-------------------------------------------------------------------------------------- Main Information */}
        <SectionComponent titleSection={"Main Information"} onEdit={() => {}}>
          <SectionField label={strings.NAME} value={specieInfo?.name} />
          <SectionField label={strings.CODE} value={specieInfo?.code} />
        </SectionComponent>
        {/* //-------------------------------------------------------------------------------------- Images Information */}
        <div className={styles.imagesContainer}>
          <div className={styles.firstImageContainer}>
            <ImageSection
              titleSection={strings.LOGO}
              imageUrl={specieInfo?.logoUrl || ""}
              onEdit={() => {}}
            />
            <ImageSection
              titleSection={strings.TRAITS_SHEET}
              imageUrl={specieInfo?.traitSheetUrl || ""}
              onEdit={() => {}}
            />
          </div>
          <div className={styles.secondImageContainer}>
            <ImageSection
              titleSection={strings.MASTER_LIST_BANNER}
              imageUrl={specieInfo?.masterListBannerUrl || ""}
              onEdit={() => {}}
            />
            <HistorySection history={specieInfo?.history || ""} />
          </div>
        </div>
        <div className={styles.extrasContainer}>
          <div className={styles.guideSheetContainer}>
            <ImageSection
              titleSection={strings.GUIDE_SHEET}
              imageUrl={specieInfo?.guideSheetUrl || ""}
              onEdit={() => {}}
              padding={"15px"}
              roundedImage="20px"
            />
          </div>
          <div className={styles.specieFormContainer}>
            <SpecieFormSection
              specieFormList={specieInfo?.specieFormInfoList || []}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeciesDetails;
