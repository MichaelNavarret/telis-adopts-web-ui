import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "./TraitsCreateDialogForm.module.scss";
import { TextField } from "@mui/material";
import { Button } from "../../../../components";
import { getSpeciesAutocomplete } from "../../../../api/species";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import { TraitCreateRequest } from "../../../../types/traits";
import { createTrait } from "../../../../api/traits";
import { formatSpecieInfoForDropdown } from "../../../../tools/dropdown";
import strings from "../../../../l10n";
import MenuButton from "../../../../components/surfaces/MenuButton";
import { MenuButtonRarityOptions } from "../../utils/MenuButtonOptions";
import AutocompleteComponent, {
  AutocompleteOption,
} from "../../../../components/Form/AutocompleteComponent";

type TraitsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  handleChangeSnackBar: (message: string) => void;
};

const TraitsCreateDialogForm = (props: TraitsCreateDialogFormProps) => {
  const { open, handleClose, handleChangeSnackBar } = props;
  const [specie, setSpecie] = useState<AutocompleteOption | null>(null);
  const [multipleStep, setMultipleStep] = useState<number[]>([]);
  const [trait, setTrait] = useState<string>("");
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
      handleChangeSnackBar(strings.TRAIT_CREATE_SUCCESSFULLY);
      clearStates();
      handleClose();
    },
  });

  const clearStates = () => {
    setSpecie(null);
    setMultipleStep([]);
    setTrait("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: TraitCreateRequest = {
      specieId: specie?.value || "",
      trait: trait,
      rarities:
        multipleStep.length > 0
          ? multipleStep.map((item) => {
              switch (item) {
                case 0:
                  return strings.COMMON.toUpperCase();
                case 1:
                  return strings.UNCOMMON.toUpperCase();
                case 2:
                  return strings.RARE.toUpperCase();
                case 3:
                  return strings.EPIC.toUpperCase();
                default:
                  return strings.COMMON.toUpperCase();
              }
            })
          : [strings.COMMON.toUpperCase()],
    };
    createTraitMutation(payload);
  };

  const handleMultipleStep = (value: number) => {
    if (multipleStep.includes(value)) {
      setMultipleStep((prev) => prev.filter((item) => item !== value));
    } else {
      setMultipleStep((prev) => [...prev, value]);
    }
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      className={styles.formMainContainer}
      autoComplete="off"
    >
      <AutocompleteComponent
        label={strings.SPECIE}
        options={formatSpecieInfoForDropdown(speciesOptions)}
        handleChange={(value: AutocompleteOption) => setSpecie(value)}
      />
      <MenuButton
        options={MenuButtonRarityOptions}
        handleClick={handleMultipleStep}
        selectMultiple
      />
      <TextField
        className={styles.textFieldForm}
        id="trait"
        label={strings.TRAIT}
        type="text"
        onChange={(e) => setTrait(e.target.value)}
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
      dialogTitle={`${strings.CREATE} ${strings.TRAIT}`}
      open={open}
      handleClose={handleClose}
      content={dialogContent}
      width="500px"
      height="400px"
    />
  );
};

export default TraitsCreateDialogForm;
