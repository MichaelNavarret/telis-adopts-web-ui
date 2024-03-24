import { useMutation, useQueryClient } from "react-query";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import styles from "./EditDialog.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { isDefined } from "../../../../tools/commons";
import { BadgesExpositor } from "../../../../components/surfaces/BadgesExpositor";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import strings from "../../../../l10n";
import { Button } from "../../../../components";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";

type EditBadgeDialogProps = {
  open: boolean;
  adopt?: AdoptInfo;
  handleClose: () => void;
};

export const EditBadgeDialog = (props: EditBadgeDialogProps) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const [selectedBadge, setSelectedBadge] = useState<string>("");

  const { mutate: updateBadge, isLoading: isUpdateBadgeLoading } = useMutation({
    mutationFn: (data: AdoptUpdateRequest) => {
      return updateAdopt(adopt?.id || "", data);
    },
    onSuccess: () => {
      successToast(strings.ADOPT_UPDATE_SUCCESSFULLY);
      queryClient.invalidateQueries(["adoptDetails", adopt?.id]);
      handleClose();
    },
  });

  useEffect(() => {
    if (isDefined(adopt) && isDefined(adopt.badge)) {
      setSelectedBadge(adopt.badge.id);
    }
  }, [adopt, handleClose]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptUpdateRequest = {
      badgeId: selectedBadge,
    };
    updateBadge(payload);
  };

  const removeBadge = () => {
    const payload: AdoptUpdateRequest = {
      badgeId: "",
    };
    updateBadge(payload);
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className={styles.dialogBadgeContainer}
    >
      <BadgesExpositor
        selectedBadge={selectedBadge}
        setSelectedBadge={setSelectedBadge}
      />
      <Button
        type="submit"
        content={strings.UPDATE}
        width="150px"
        height="30px"
        disabled={isUpdateBadgeLoading}
        loading={isUpdateBadgeLoading}
        catsLoading={isUpdateBadgeLoading}
        withShadow={false}
      />
      <Button
        onClick={removeBadge}
        content={strings.REMOVE}
        width="150px"
        height="30px"
        colorButton="red"
        colorTextButton="white"
        disabled={isUpdateBadgeLoading}
        loading={isUpdateBadgeLoading}
        catsLoading={isUpdateBadgeLoading}
        withShadow={false}
      />
    </form>
  );
  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      content={dialogContent}
    />
  );
};
