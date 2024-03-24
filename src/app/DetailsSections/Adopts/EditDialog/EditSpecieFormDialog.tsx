import { useMutation, useQueryClient } from "react-query";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import styles from "./EditDialog.module.scss";
import { FormEvent, useEffect, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import strings from "../../../../l10n";
import { Button } from "../../../../components";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";
import SpecieFormExpositor from "../../../../components/surfaces/SpecieFormExpositor";
import { useTheme } from "../../../../context/ThemeProvider";
import { isDefined } from "../../../../tools/commons";

type EditSpecieFormDialogProps = {
  open: boolean;
  adopt?: AdoptInfo;
  handleClose: () => void;
};

export const EditSpecieFormDialog = (props: EditSpecieFormDialogProps) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const [selectedForm, setSelectedForm] = useState<string>("");
  const { colors } = useTheme();

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
    if (isDefined(adopt) && isDefined(adopt.specieFormId)) {
      setSelectedForm(adopt.specieFormId);
    }
  }, [adopt, handleClose]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptUpdateRequest = {
      specieFormId: selectedForm,
    };
    updateBadge(payload);
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className={styles.dialogSpecieFormContainer}
    >
      <SpecieFormExpositor
        selected={selectedForm}
        setSelected={setSelectedForm}
        borderColor={colors.CTX_BORDER_ICON_COLOR}
        specieId={adopt?.specieId || ""}
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
