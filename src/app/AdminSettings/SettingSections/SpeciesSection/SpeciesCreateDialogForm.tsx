import { FormEvent, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./SpeciesCreateDialogForm.module.scss";
import { Button } from "../../../../components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createSpecie, getSpeciesAutocomplete } from "../../../../api/species";
import strings from "../../../../l10n";
import { successToast } from "../../../../constants/toasts";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { Checkbox } from "@mui/material";
import SpecieFormAddDialog from "./SpecieFormAddDialog";
import { formatSpecieInfoForDropdown } from "../../../../tools/dropdown";
import AutocompleteComponent, {
  AutocompleteOption,
} from "../../../../components/Form/AutocompleteComponent";

type SpecieCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const SpeciesCreateDialogForm = (props: SpecieCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const [displaySpecieForm, setDisplaySpecieForm] = useState(false);
  const [openSpecieForm, setOpenSpecieForm] = useState(false);
  const [specieName, setSpecieName] = useState("");
  const [mainSpecieId, setMainSpecieId] = useState<AutocompleteOption | null>(
    null
  );
  const queryClient = useQueryClient();
  const [specieId, setSpecieId] = useState<string>("");

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const { mutate: crateSpecieMutation, isLoading } = useMutation({
    mutationFn: () => {
      return createSpecie({
        name: specieName,
        mainSpecieId: mainSpecieId?.value,
      });
    },
    onSuccess: (data) => {
      successToast(strings.SPECIE_CREATED_SUCCESSFULLY);
      if (displaySpecieForm) {
        setOpenSpecieForm(true);
        setSpecieId(data.id);
      }
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
    crateSpecieMutation();
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      className={styles.formMainContainer}
      autoComplete="off"
    >
      <TextFieldComponent
        className={styles.textFieldForm}
        id="speciesName"
        label={strings.NAME}
        type="text"
        onChange={(e) => setSpecieName(e.target.value)}
        required
        disabled={isLoading}
      />
      <AutocompleteComponent
        label={strings.MAIN_SPECIE}
        options={formatSpecieInfoForDropdown(speciesOptions)}
        handleChange={(value: AutocompleteOption) => setMainSpecieId(value)}
        disabled={isLoading}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Checkbox
          checked={displaySpecieForm}
          onChange={() => setDisplaySpecieForm(!displaySpecieForm)}
        />
        <p>
          Dou you wanna set a Extra Specie Form before create this new Specie?
        </p>
      </div>

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
    <>
      <DialogComponent
        dialogTitle={`${strings.CREATE} ${strings.SPECIE}`}
        open={open}
        handleClose={handleClose}
        content={dialogContent}
      />
      <SpecieFormAddDialog
        open={openSpecieForm}
        handleClose={() => setOpenSpecieForm(false)}
        specieId={specieId}
      />
    </>
  );
};

export default SpeciesCreateDialogForm;
