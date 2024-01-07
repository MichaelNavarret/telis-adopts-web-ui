import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./DialogForms.module.scss";
import { TextField } from "@mui/material";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { getSpeciesAutocomplete } from "../../../../api/species";
import { CREATION_TYPE } from "../../../../constants/SelectOptions";
import { Button } from "../../../../components";
import { AdoptCreateRequest, CreationType } from "../../../../types/adopt";
import { createAdopt } from "../../../../api/adopts";
import { useTheme } from "../../../../context/ThemeProvider";
import DropdownComponent from "../../../../components/Form/DropdownComponent";
import {
  formatOwnerInfoForDropdown,
  formatSpecieInfoForDropdown,
} from "../../../../tools/dropdown";
import AutocompleteComponent, {
  AutocompleteOption,
} from "../../../../components/Form/AutocompleteComponent";
import MenuButton from "./components/MenuButton";
import { MenuButtonOwnerOptions } from "../../utils/MenuButtonOptions";
import strings from "../../../../l10n";

type AdoptsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  handleChangeSnackBar: (message: string) => void;
};

const AdoptsCreateDialogForm = (props: AdoptsCreateDialogFormProps) => {
  const { open, handleClose, handleChangeSnackBar } = props;
  const [step, setStep] = useState<number>(0);
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [adoptName, setAdoptName] = useState("");
  const [owner, setOwner] = useState<AutocompleteOption | null>(null);
  const [notRegisteredOwner, setNotRegisteredOwner] = useState<string>("");
  const [specie, setSpecie] = useState<AutocompleteOption | null>(null);
  const [creationType, setCreationType] = useState<CreationType>("PREMADE");

  const { data: ownersResponse } = useQuery({
    queryKey: ["autocompleteOwners"],
    queryFn: () => {
      return getOwnersAutocomplete();
    },
  });

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const { mutate: createAdoptMutation } = useMutation({
    mutationFn: (data: AdoptCreateRequest) => {
      return createAdopt(data);
    },
    onSuccess: () => {
      handleChangeSnackBar(strings.ADOPT_CREATE_SUCCESSFULLY);
      queryClient.invalidateQueries("adopts");
      clearStates();
      handleClose();
    },
  });

  const handleStep = (value: number) => {
    setStep(value);
    setOwner(null);
    setNotRegisteredOwner("");
  };

  const clearStates = () => {
    setAdoptName("");
    setOwner({ label: "", value: "" });
    setSpecie({ label: "", value: "" });
    setCreationType("PREMADE");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptCreateRequest = {
      name: adoptName,
      ownerId: owner
        ? owner.value
        : notRegisteredOwner
        ? notRegisteredOwner
        : "",
      specieId: specie ? specie.value : "",
      creationType: creationType,
    };
    createAdoptMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <TextField
        className={styles.textFieldForm}
        id="adoptName"
        label={strings.ADOPT_NAME}
        type="text"
        onChange={(e) => setAdoptName(e.target.value)}
      />

      <div
        className={styles.ownersContainer}
        style={{
          border: `1px dashed ${colors.CTX_MENUBAR_COLOR}`,
          borderRadius: "5px",
        }}
      >
        <MenuButton options={MenuButtonOwnerOptions} handleClick={handleStep} />
        {step !== 2 ? (
          <AutocompleteComponent
            key={`owner_autocomplete${step}`}
            label={strings.OWNER}
            options={formatOwnerInfoForDropdown(ownersResponse)}
            handleChange={(value: AutocompleteOption) => setOwner(value)}
            disabled={step === 0}
            required={step === 1}
          />
        ) : (
          <TextField
            key={`owner_texField${step}`}
            id="owner"
            label={strings.NOT_REGISTERED_OWNER}
            type="text"
            value={notRegisteredOwner}
            onChange={(e) => setNotRegisteredOwner(e.target.value)}
            required
          />
        )}
      </div>

      <AutocompleteComponent
        label={strings.SPECIE}
        options={formatSpecieInfoForDropdown(speciesOptions)}
        handleChange={(value: AutocompleteOption) => setSpecie(value)}
      />

      <DropdownComponent
        name={strings.CREATION_TYPE}
        label={"creationType"}
        value={creationType}
        handleChange={(e) => setCreationType(e.target.value)}
        options={CREATION_TYPE}
      />

      <Button
        type="submit"
        content={strings.CREATE}
        width="150px"
        height="35px"
        colorButton={colors.CTX_FORM_BUTTON_COLOR}
        buttonColorShadow={colors.CTX_BUTTON_SHADOW_COLOR_2}
      />
    </form>
  );

  return (
    <DialogComponent
      dialogTitle={`${strings.CREATE} ${strings.ADOPT}`}
      open={open}
      handleClose={handleClose}
      content={dialogContent}
    />
  );
};

export default AdoptsCreateDialogForm;
