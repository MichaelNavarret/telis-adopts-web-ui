import { FormEvent, useState } from "react";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { Button } from "../../../../components";
import strings from "../../../../l10n";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import { useMutation, useQueryClient } from "react-query";
import { updateSpecie } from "../../../../api/species";
import styles from "./Dialogs.module.scss";
import { successToast } from "../../../../constants/toasts";
import { queryKeys } from "../../../../constants/queryKeys";

type UpdateNameDialogProps = {
  open: boolean;
  handleClose: () => void;
  specieId: string;
};

const UpdateNameDialog = (props: UpdateNameDialogProps) => {
  const { open, handleClose, specieId } = props;
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: UpdateName, isLoading: isUpdateNameLoading } = useMutation({
    mutationFn: () => {
      return updateSpecie(specieId, { name: name });
    },
    onSuccess: () => {
      successToast(strings.SPECIE_UPDATED_SUCCESSFULLY);
      queryClient.invalidateQueries([queryKeys.specie, specieId]);
      setName("");
      handleClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    UpdateName();
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.updateNameDialogFormContainer}>
      <div className={styles.updateNameContainer}>
        <TextFieldComponent
          label={strings.NAME}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isUpdateNameLoading}
        />
      </div>
      <Button
        type="submit"
        content={strings.UPDATE}
        disabled={isUpdateNameLoading}
        loading={isUpdateNameLoading}
        catsLoading={isUpdateNameLoading}
      />
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      dialogTitle={`${strings.UPDATE} ${strings.NAME}`}
      content={dialogContent}
    />
  );
};

export default UpdateNameDialog;
