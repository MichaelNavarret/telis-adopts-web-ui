import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./AdoptsCreateDialogForm.module.scss";
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
import MenuButton from "../../../../components/surfaces/MenuButton";
import {
  MenuButtonDesignersOptions,
  MenuButtonOwnerOptions,
} from "../../utils/MenuButtonOptions";
import strings from "../../../../l10n";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

type AdoptsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  handleChangeSnackBar: (message: string) => void;
};

const AdoptsCreateDialogForm = (props: AdoptsCreateDialogFormProps) => {
  const { open, handleClose, handleChangeSnackBar } = props;
  const [ownerOption, setOwnerOption] = useState<number>(0);
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [adoptName, setAdoptName] = useState("");
  const [owner, setOwner] = useState<AutocompleteOption | null>(null);
  const [notRegisteredOwner, setNotRegisteredOwner] = useState<string>("");
  const [specie, setSpecie] = useState<AutocompleteOption | null>(null);
  const [creationType, setCreationType] = useState<CreationType>("PREMADE");
  const [designersFields, setDesignersFields] = useState<number>(1);
  const [designersOption, setDesignersOption] = useState<number[]>([0, 0]);
  const [designers, setDesigners] = useState<AutocompleteOption[]>([]);
  const [designersNotRegistered, setDesignersNotRegistered] = useState<
    string[]
  >(["", ""]);

  useEffect(() => {
    clearStates();
    setOwnerOption(0);
    setDesignersFields(1);
    setDesignersOption([0, 0]);
  }, [handleClose]);
  const availableDesignerSection =
    creationType === "MYO" || creationType === "GUEST_ARTIST";

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
      queryClient.invalidateQueries("autocompleteOwners");
      clearStates();
      setOwnerOption(0);
      handleClose();
    },
  });

  const handleOwnerOption = (value: number) => {
    setOwnerOption(value);
    setOwner(null);
    setNotRegisteredOwner("");
  };

  const handleDesignersOption = (value: number, index?: number) => {
    if (index === 0) {
      setDesignersOption([value, designersOption[1]]);
    } else {
      setDesignersOption([designersOption[0], value]);
    }
    setDesigners([]);
    setDesignersNotRegistered(["", ""]);
  };

  const clearStates = () => {
    setAdoptName("");
    setOwner(null);
    setNotRegisteredOwner("");
    setSpecie(null);
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
      notRegisteredOwner: owner ? false : true,
    };
    createAdoptMutation(payload);
  };

  const dialogContent = (
    <form onSubmit={onSubmit} className={styles.formMainContainer}>
      <div className={styles.sectionsContainer}>
        <div className={styles.principalSectionContainer}>
          <TextComponent
            content={"Principal Information"}
            animation={false}
            hover={false}
          />
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
            <MenuButton
              options={MenuButtonOwnerOptions}
              handleClick={handleOwnerOption}
            />
            {ownerOption !== 2 ? (
              <AutocompleteComponent
                key={`owner_autocomplete${ownerOption}`}
                label={strings.OWNER}
                options={formatOwnerInfoForDropdown(ownersResponse)}
                handleChange={(value: AutocompleteOption) => setOwner(value)}
                disabled={ownerOption === 0}
                required={ownerOption === 1}
              />
            ) : (
              <TextField
                style={{ marginTop: "10px" }}
                key={`owner_texField${ownerOption}`}
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
        </div>

        <div
          className={styles.designerSectionContainer}
          style={{
            filter: !availableDesignerSection ? "grayscale(100%)" : "none",
          }}
        >
          <TextComponent
            content={"Designers Information"}
            animation={false}
            hover={false}
          />
          {Array.from(Array(designersFields).keys()).map((index) => (
            <div
              key={`designer${index}`}
              className={styles.designersContainer}
              style={{
                border: `1px dashed ${colors.CTX_MENUBAR_COLOR}`,
                borderRadius: "5px",
              }}
            >
              <MenuButton
                key={`designer_menuButton${index}`}
                options={MenuButtonDesignersOptions}
                handleClick={handleDesignersOption}
                externalIndex={index}
                disabled={!availableDesignerSection}
              />
              {designersOption[index] !== 1 ? (
                <AutocompleteComponent
                  key={`owner_autocomplete${ownerOption}`}
                  label={"Designer " + (index + 1)}
                  options={formatOwnerInfoForDropdown(ownersResponse)}
                  handleChange={(value: AutocompleteOption) =>
                    setDesigners([...designers, value])
                  }
                  disabled={!availableDesignerSection}
                />
              ) : (
                <TextField
                  style={{ marginTop: "10px", width: "100%" }}
                  key={`owner_texField${ownerOption}`}
                  id="owner"
                  label={"Designer " + (index + 1)}
                  type="text"
                  value={designersNotRegistered[index]}
                  onChange={(e) =>
                    setDesignersNotRegistered([
                      ...designersNotRegistered,
                      e.target.value,
                    ])
                  }
                  disabled={!availableDesignerSection}
                  required
                />
              )}
            </div>
          ))}
          <div className={styles.iconContainer}>
            <ControlPointRoundedIcon
              fontSize="large"
              style={{
                color:
                  availableDesignerSection && designersFields !== 2
                    ? colors.CTX_BUTTON_SHADOW_COLOR_2
                    : "grey",
                cursor:
                  availableDesignerSection && designersFields !== 2
                    ? "pointer"
                    : "not-allowed",
              }}
              className={
                availableDesignerSection && designersFields !== 2
                  ? styles.addDesignerButton
                  : ""
              }
              onClick={() =>
                availableDesignerSection &&
                designersFields !== 2 &&
                setDesignersFields(designersFields + 1)
              }
            />
            <DeleteForeverRoundedIcon
              fontSize="large"
              className={
                availableDesignerSection && designersFields !== 1
                  ? styles.deleteDesignerButton
                  : ""
              }
              style={{
                color:
                  availableDesignerSection && designersFields !== 1
                    ? colors.CTX_BUTTON_SHADOW_COLOR_2
                    : "grey",
                cursor:
                  availableDesignerSection && designersFields !== 1
                    ? "pointer"
                    : "not-allowed",
              }}
              onClick={() =>
                availableDesignerSection &&
                designersFields !== 1 &&
                setDesignersFields(designersFields - 1)
              }
            />
          </div>
        </div>

        {/* <div>Section Traits</div> */}
      </div>

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
      fullScreen={true}
    />
  );
};

export default AdoptsCreateDialogForm;