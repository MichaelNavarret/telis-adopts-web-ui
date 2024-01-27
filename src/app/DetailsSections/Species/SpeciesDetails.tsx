import { useMutation, useQuery, useQueryClient } from "react-query";
import TextComponent from "../../../components/TextComponents/TextComponent";
import styles from "./SpeciesDetails.module.scss";
import {
  getSpecie,
  updateSpecie,
  updateSpecieAsset,
} from "../../../api/species";
import { useTheme } from "../../../context/ThemeProvider";
import SectionComponent from "../../../components/SectionComponent/SectionComponent";
import SectionField from "../../../components/SectionComponent/SectionField";
import strings from "../../../l10n";
import ImageSection from "./components/ImageSection";
import HistorySection from "./components/HistorySection";
import SpecieFormSection from "./components/SpecieFormSection";
import { useState } from "react";
import UpdateNameDialog from "./DialogsForms/UpdateNameDialog";
import { queryKeys } from "../../../constants/queryKeys";
import { successToast } from "../../../constants/toasts";
import { SpecieUpdateRequest } from "../../../types/species";
import UpdateStoryDialog from "./DialogsForms/UpdateStoryDialog";

type SpeciesDetailsProps = {
  specieId: string;
};

type AssetType = "LOGO" | "GUIDE_SHEET" | "TRAIT_SHEET" | "MASTER_LIST_BANNER";

type AssetUploadPayload = {
  file: File;
  assetType: AssetType;
};

const SpeciesDetails = (props: SpeciesDetailsProps) => {
  const { specieId } = props;
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [openUpdateName, setOpenUpdateName] = useState(false);
  const [openUpdateStory, setOpenUpdateStory] = useState(false);

  const { data: specieInfo, isLoading: isSpecieInfoLoading } = useQuery({
    queryKey: [queryKeys.specie, specieId],
    queryFn: () => {
      return getSpecie(specieId);
    },
  });

  const { mutate: updateAssetMutation } = useMutation({
    mutationFn: (payload: AssetUploadPayload) => {
      return updateSpecieAsset(
        specieId,
        {
          assetType: payload.assetType,
        },
        payload.file
      );
    },
    onSuccess: () => {
      successToast("Asset updated successfully!");
      queryClient.invalidateQueries(queryKeys.specie);
    },
  });

  const handleLogoDrop = (files: File[]) => {
    const payload: AssetUploadPayload = {
      file: files[0],
      assetType: "LOGO",
    };
    updateAssetMutation(payload);
  };

  const handleTraitSheetDrop = (files: File[]) => {
    const payload: AssetUploadPayload = {
      file: files[0],
      assetType: "TRAIT_SHEET",
    };
    updateAssetMutation(payload);
  };

  const handleMasterListBannerDrop = (files: File[]) => {
    const payload: AssetUploadPayload = {
      file: files[0],
      assetType: "MASTER_LIST_BANNER",
    };
    updateAssetMutation(payload);
  };

  const handleGuideSheetDrop = (files: File[]) => {
    const payload: AssetUploadPayload = {
      file: files[0],
      assetType: "GUIDE_SHEET",
    };
    updateAssetMutation(payload);
  };

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
        <SectionComponent
          titleSection={"Main Information"}
          onEdit={() => setOpenUpdateName(true)}
        >
          <SectionField label={strings.NAME} value={specieInfo?.name} />
          <SectionField label={strings.CODE} value={specieInfo?.code} />
        </SectionComponent>
        {/* //-------------------------------------------------------------------------------------- Images Information */}
        <div className={styles.imagesContainer}>
          <div className={styles.firstImageContainer}>
            <ImageSection
              titleSection={strings.LOGO}
              imageUrl={specieInfo?.logoUrl || ""}
              onEdit={handleLogoDrop}
            />
            <ImageSection
              titleSection={strings.TRAITS_SHEET}
              imageUrl={specieInfo?.traitSheetUrl || ""}
              onEdit={handleTraitSheetDrop}
            />
          </div>
          <div className={styles.secondImageContainer}>
            <ImageSection
              titleSection={strings.MASTER_LIST_BANNER}
              imageUrl={specieInfo?.masterListBannerUrl || ""}
              onEdit={handleMasterListBannerDrop}
            />
            <HistorySection
              history={specieInfo?.history || ""}
              onEdit={() => setOpenUpdateStory(true)}
            />
          </div>
        </div>
        <div className={styles.extrasContainer}>
          <div className={styles.guideSheetContainer}>
            <ImageSection
              titleSection={strings.GUIDE_SHEET}
              imageUrl={specieInfo?.guideSheetUrl || ""}
              onEdit={handleGuideSheetDrop}
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

      {/* //-------------------------------------------------------------------------------------- Dialogs */}
      <UpdateNameDialog
        open={openUpdateName}
        handleClose={() => setOpenUpdateName(false)}
        specieId={specieId}
      />
      {specieInfo && (
        <UpdateStoryDialog
          currentStory={specieInfo?.history || ""}
          open={openUpdateStory}
          handleClose={() => setOpenUpdateStory(false)}
          specieId={specieId}
        />
      )}
    </>
  );
};

export default SpeciesDetails;
