import { useQuery } from "react-query";
import { getAdopt } from "../../../api/adopts";
import styles from "./AdoptDetails.module.scss";
import TextComponent from "../../../components/TextComponents/TextComponent";
import strings from "../../../l10n";
import {
  getBorderColor,
  getIconBoxShadow,
  safeGetIcon,
} from "../../../tools/commons";
import SectionComponent from "../../../components/SectionComponent/SectionComponent";
import SectionField from "../../../components/SectionComponent/SectionField";
import { useState } from "react";
import ImageSection from "../Species/components/ImageSection";

type AdoptDetailsProps = {
  adoptId: string;
};

export const AdoptDetails = (props: AdoptDetailsProps) => {
  const { adoptId } = props;
  const [mainInformationDialog, setMainInformationDialog] = useState(false);

  const { data: adoptResponse } = useQuery({
    queryKey: ["adoptDetails", adoptId],
    queryFn: async () => {
      return getAdopt(adoptId);
    },
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleSection}>
        <TextComponent
          content={strings.ADOPT_DETAILS}
          hover={false}
          animation={false}
          fontSize="x-large"
        />
      </div>
      <div className={styles.iconSection}>
        <img
          src={safeGetIcon(adoptResponse?.iconUrl)}
          alt="adopt_icon"
          width={200}
          style={{
            filter: getIconBoxShadow(getBorderColor(adoptResponse?.specieCode)),
          }}
        />
      </div>
      <SectionComponent
        titleSection={strings.MAIN_INFORMATION}
        onEdit={() => setMainInformationDialog(true)}
      >
        <SectionField label={strings.NAME} value={adoptResponse?.name} />
        <SectionField label={strings.CODE} value={adoptResponse?.code} />
        <SectionField
          label={strings.SPECIE}
          value={adoptResponse?.specieName}
        />
      </SectionComponent>
      <div className={styles.secondContainer}>
        <div className={styles.badgeAndFormContainer}>
          {adoptResponse && adoptResponse.badge && (
            <ImageSection
              titleSection={strings.BADGE}
              imageUrl={adoptResponse?.badge.badgeUrl}
              onEdit={() => {}}
            />
          )}
          {adoptResponse && adoptResponse.specieFormId && (
            <ImageSection
              titleSection={strings.FORM}
              imageUrl={adoptResponse?.specieFormId}
              onEdit={() => {}}
            />
          )}
          <div className={styles.formContainer}>Form</div>
        </div>
        <div className={styles.traitsContainer}>Traits</div>
      </div>
    </div>
  );
};
