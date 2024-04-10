import { useMutation, useQueryClient } from "react-query";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import { useEffect, useState } from "react";
import { updateAdopt } from "../../../../api/adopts";
import strings from "../../../../l10n";
import { successToast } from "../../../../constants/toasts";
import { isDefined } from "../../../../tools/commons";
import styles from "./EditBadgeBlade.module.scss";
import { BadgesExpositor } from "../../../../components/surfaces/BadgesExpositor";
import { Button, Container } from "../../../../components";
import Blade from "../../../../components/fc_components/Blade";

type EditBadgeBladeProps = {
  open: boolean;
  handleClose: () => void;
  adopt?: AdoptInfo;
};

const EditBadgeBlade = (props: EditBadgeBladeProps) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const [selectedBadge, setSelectedBadge] = useState<string>("");

  useEffect(() => {
    if (isDefined(adopt) && isDefined(adopt.badge)) {
      setSelectedBadge(adopt.badge.id);
    } else {
      setSelectedBadge("");
    }
  }, [adopt, handleClose]);

  const { mutate: updateBadgeMutation, isLoading: isUpdateBadgeLoading } =
    useMutation({
      mutationFn: (data: AdoptUpdateRequest) => {
        return updateAdopt(adopt?.id || "", data);
      },
      onSuccess: () => {
        successToast(strings.ADOPT_UPDATE_SUCCESSFULLY);
        queryClient.invalidateQueries(["adoptDetails", adopt?.id]);
        handleClose();
      },
    });

  const bladeContent = (
    <BadgesExpositor
      title={strings.SELECT_A_BADGE}
      description={strings.REMOVE_BADGE_INFO}
      selectedBadge={selectedBadge}
      setSelectedBadge={setSelectedBadge}
    />
  );

  const bladeFooter = (
    <Container className={styles.footerContainer}>
      <Button
        content={strings.CANCEL}
        onClick={handleClose}
        withShadow={false}
        width="130px"
        height="30px"
        disabled={isUpdateBadgeLoading}
      />
      <Button
        content={strings.UPDATE}
        onClick={() => updateBadgeMutation({ badgeId: selectedBadge })}
        withShadow={false}
        width="130px"
        height="30px"
        disabled={isUpdateBadgeLoading}
        loading={isUpdateBadgeLoading}
        catsLoading={isUpdateBadgeLoading}
      />
    </Container>
  );

  return (
    <Blade
      bodyNode={bladeContent}
      footerNode={bladeFooter}
      title={strings.UPDATE + " " + strings.BADGE}
      onClose={handleClose}
      open={open}
    />
  );
};

export default EditBadgeBlade;
