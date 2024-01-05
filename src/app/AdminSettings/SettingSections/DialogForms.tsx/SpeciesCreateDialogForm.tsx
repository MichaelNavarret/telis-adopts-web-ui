import { TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import DialogComponent from "../../../../components/DialogComponent";
import styles from "./DialogForms.module.scss";
import { Button } from "../../../../components";
import { useMutation, useQueryClient } from "react-query";
import { createSpecie } from "../../../../api/species";
import TextComponent from "../../../../components/TextComponents/TextComponent";

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
      handleChangeSnackBar("Specie created successfully");
      queryClient.invalidateQueries("species");
      handleClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: SpecieCreateRequest = {
      name: specieName,
    };
    crateSpecieMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <TextComponent
        content="Create Specie Form"
        animation={false}
        hover={false}
      />
      <TextField
        className={styles.textFieldForm}
        id="speciesName"
        label="Species Name"
        type="text"
        onChange={(e) => setSpecieName(e.target.value)}
        required
      />
      <Button type="submit" width="150px" height="35px">
        Create
      </Button>
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

export default SpeciesCreateDialogForm;
