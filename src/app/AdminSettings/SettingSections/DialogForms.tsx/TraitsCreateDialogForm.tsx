import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "./DialogForms.module.scss";
import { InputLabel, Select, TextField } from "@mui/material";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import { Button } from "../../../../components";
import { getSpeciesAutocomplete } from "../../../../api/species";
import MenuItem from "@mui/material/MenuItem";
import DialogComponent from "../../../../components/DialogComponent";
import { RARITY_OPTIONS } from "../../../../constants/SelectOptions";
import { TraitCreateRequest } from "../../../../types/traits";
import { createTrait } from "../../../../api/traits";

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
  const [rarity, setRarity] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const { mutate: createTraitMutation, isLoading: isCreateTraitLoading } =
    useMutation({
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
      rarity: rarity,
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
      <div style={{ width: "100%" }}>
        <InputLabel id="speciesLabel">Species</InputLabel>
        <Select
          labelId="speciesLabel"
          style={{ width: "100%" }}
          label="Species"
          value={specie}
          onChange={(e) => setSpecie(e.target.value)}
        >
          {speciesOptions?.map((specie, index) => {
            return (
              <MenuItem key={specie.id + "_" + index} value={specie.id}>
                {specie.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
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

      <div style={{ width: "100%" }}>
        <InputLabel id="rarityLabel">Rarity</InputLabel>
        <Select
          labelId="rarityLabel"
          style={{ width: "100%" }}
          label="Species"
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
        >
          {RARITY_OPTIONS?.map((option, index) => {
            return (
              <MenuItem key={option.value + "_" + index} value={option.value}>
                {option.label}{" "}
              </MenuItem>
            );
          })}
        </Select>
      </div>

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

export default TraitsCreateDialogForm;
