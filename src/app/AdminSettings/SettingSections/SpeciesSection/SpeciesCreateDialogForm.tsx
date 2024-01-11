import { TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./SpeciesCreateDialogForm.module.scss";
import { Button } from "../../../../components";
import { useMutation, useQueryClient } from "react-query";
import { createSpecie } from "../../../../api/species";
import strings from "../../../../l10n";
import { successToast } from "../../../../constants/toasts";

type SpecieCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const SpeciesCreateDialogForm = (props: SpecieCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const [specieName, setSpecieName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: crateSpecieMutation, isLoading } = useMutation({
    mutationFn: (data: SpecieCreateRequest) => {
      return createSpecie(data);
    },
    onSuccess: () => {
      successToast(strings.SPECIE_CREATED_SUCCESSFULLY);
      queryClient.invalidateQueries("species");
      queryClient.invalidateQueries("autocompleteSpecies");
      clearStates();
      handleClose();
    },
  });

  const clearStates = () => {
    setSpecieName("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: SpecieCreateRequest = {
      name: specieName,
    };
    crateSpecieMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <TextField
        className={styles.textFieldForm}
        id="speciesName"
        label={strings.NAME}
        type="text"
        onChange={(e) => setSpecieName(e.target.value)}
        required
        disabled={isLoading}
      />
      <Button
        content={strings.CREATE}
        type="submit"
        width="150px"
        height="35px"
        disabled={isLoading}
        loading={isLoading}
        catsLoading={isLoading}
      />
    </form>
  );

  return (
    <DialogComponent
      dialogTitle={`${strings.CREATE} ${strings.SPECIE}`}
      open={open}
      handleClose={handleClose}
      content={dialogContent}
    />
  );
};

export default SpeciesCreateDialogForm;
