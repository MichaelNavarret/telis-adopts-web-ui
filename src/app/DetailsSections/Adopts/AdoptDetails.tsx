import { useQuery } from "react-query";
import { getAdopt } from "../../../api/adopts";
import styles from "./AdoptDetails.module.scss";
import TextComponent from "../../../components/TextComponents/TextComponent";
import strings from "../../../l10n";
import {
  formatCreationType,
  formatDate,
  getBorderColor,
  getIconBoxShadow,
  safeGetIcon,
} from "../../../tools/commons";
import SectionComponent from "../../../components/SectionComponent/SectionComponent";
import SectionField from "../../../components/SectionComponent/SectionField";
import { useState } from "react";
import ImageSection from "./components/ImageSection";
import { EditSpecieFormDialog } from "./EditDialog/EditSpecieFormDialog";
import EditTraitsDialog from "./EditDialog/EditTraitsDialog";
import DesignersSection from "./components/DesignersSection";
import EditMainInfoBlade from "./EditBlades/EditMainInfoBlade";
import EditBadgeBlade from "./EditBlades/EditBadgeBlade";

type AdoptDetailsProps = {
  adoptId: string;
};

export const AdoptDetails = (props: AdoptDetailsProps) => {
  const { adoptId } = props;
  const [mainInformationDialog, setMainInformationDialog] = useState(false);
  const [editBadgeDialog, setEditBadgeDialog] = useState(false);
  const [editSpecieFormDialog, setEditSpecieFormDialog] = useState(false);
  const [editTraitsDialog, setEditTraitsDialog] = useState(false);

  const { data: adoptResponse } = useQuery({
    queryKey: ["adoptDetails", adoptId],
    queryFn: async () => {
      return getAdopt(adoptId);
    },
  });

  const getOrderedTraits = () => {
    return adoptResponse?.traits.sort((a, b) => {
      if (a.mainTraitDisplayPriority < b.mainTraitDisplayPriority) {
        return -1;
      }
      if (a.mainTraitDisplayPriority > b.mainTraitDisplayPriority) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <>
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
              filter: getIconBoxShadow(
                getBorderColor(adoptResponse?.specieCode)
              ),
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
          <SectionField
            label={strings.CREATED_ON}
            value={formatDate(adoptResponse?.createdOn || "")}
          />
          <SectionField
            label={strings.OWNER}
            value={adoptResponse?.ownerName}
          />
          <SectionField
            label={strings.CREATION_TYPE}
            value={formatCreationType(adoptResponse?.creationType)}
          />
          <SectionField
            label={strings.TOYHOUSE}
            value={adoptResponse?.toyhouseLink}
            link
          />
          <SectionField
            label={strings.STATUS}
            value={adoptResponse?.active ? strings.ACTIVE : strings.INACTIVE}
          />
        </SectionComponent>
        <DesignersSection
          adoptId={adoptId}
          designers={adoptResponse?.designers || []}
        />
        <div className={styles.secondContainer}>
          <div className={styles.badgeAndFormContainer}>
            <ImageSection
              titleSection={strings.BADGE}
              imageUrl={
                adoptResponse?.badge ? adoptResponse?.badge.badgeUrl : ""
              }
              onEdit={() => setEditBadgeDialog(true)}
              width="50px"
              paddingBottom="10px"
            />

            <ImageSection
              titleSection={strings.FORM}
              imageUrl={adoptResponse?.specieFormUrl}
              onEdit={() => setEditSpecieFormDialog(true)}
              width="250px"
            />
          </div>
          <div className={styles.traitsContainer}>
            <SectionComponent
              titleSection={strings.TRAITS}
              onEdit={() => setEditTraitsDialog(true)}
              displayType="row"
            >
              {getOrderedTraits()?.map((trait) => (
                <SectionField
                  key={trait.id}
                  label={trait.mainTrait}
                  value={trait.rarity}
                />
              ))}
            </SectionComponent>
          </div>
        </div>
      </div>
      <EditMainInfoBlade
        open={mainInformationDialog}
        adopt={adoptResponse}
        handleClose={() => setMainInformationDialog(false)}
      />
      <EditBadgeBlade
        open={editBadgeDialog}
        adopt={adoptResponse}
        handleClose={() => setEditBadgeDialog(false)}
      />
      <EditSpecieFormDialog
        open={editSpecieFormDialog}
        adopt={adoptResponse}
        handleClose={() => setEditSpecieFormDialog(false)}
      />
      <EditTraitsDialog
        open={editTraitsDialog}
        adopt={adoptResponse}
        handleClose={() => setEditTraitsDialog(false)}
      />
    </>
  );
};
