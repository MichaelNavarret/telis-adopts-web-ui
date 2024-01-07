import { TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./DialogForms.module.scss";
import { Button } from "../../../../components";
import { useMutation, useQueryClient } from "react-query";
import { createSpecie } from "../../../../api/species";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import strings from "../../../../l10n";

type SpecieCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  handleChangeSnackBar: (message: string) => void;
};

const SpeciesCreateDialogForm = (props: SpecieCreateDialogFormProps) => {
  const { open, handleClose, handleChangeSnackBar } = props;
  const [specieName, setSpecieName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: crateSpecieMutation } = useMutation({
    mutationFn: (data: SpecieCreateRequest) => {
      return createSpecie(data);
    },
    onSuccess: () => {
      handleChangeSnackBar(strings.SPECIE_CREATED_SUCCESSFULLY);
      queryClient.invalidateQueries("species");
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
      />
      <Button
        content={strings.CREATE}
        type="submit"
        width="150px"
        height="35px"
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
