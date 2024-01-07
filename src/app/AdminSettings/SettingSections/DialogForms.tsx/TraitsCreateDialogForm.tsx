import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "./DialogForms.module.scss";
import { TextField } from "@mui/material";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import { Button } from "../../../../components";
import { getSpeciesAutocomplete } from "../../../../api/species";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import { TraitCreateRequest } from "../../../../types/traits";
import { createTrait } from "../../../../api/traits";
import DropdownComponent from "../../../../components/Form/DropdownComponent";
import { formatSpecieInfoForDropdown } from "../../../../tools/dropdown";

type TraitsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  handleChangeSnackBar: (message: string) => void;
};

const TraitsCreateDialogForm = (props: TraitsCreateDialogFormProps) => {
  const { open, handleClose, handleChangeSnackBar } = props;
  const [specie, setSpecie] = useState<string>("");
  const [characteristic, setCharacteristic] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const { mutate: createTraitMutation } = useMutation({
    mutationFn: (data: TraitCreateRequest) => {
      return createTrait(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("traits");
      handleChangeSnackBar("Trait created successfully");
      handleClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: TraitCreateRequest = {
      specieId: specie,
      characteristic: characteristic,
      code: code,
    };
    createTraitMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <TextComponent
        content="Create Trait Form"
        animation={false}
        hover={false}
      />
      <DropdownComponent
        name={"Specie"}
        label={"species"}
        value={specie}
        handleChange={(e) => setSpecie(e.target.value)}
        options={formatSpecieInfoForDropdown(speciesOptions)}
        required
      />
      <TextField
        className={styles.textFieldForm}
        id="traitCode"
        label="Code"
        type="text"
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <TextField
        className={styles.textFieldForm}
        id="traitCharacteristic"
        label="Characteristic"
        type="text"
        onChange={(e) => setCharacteristic(e.target.value)}
        required
      />
      <Button content={"Create"} type="submit" width="150px" height="35px" />
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

export default TraitsCreateDialogForm;
