import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./AdoptsCreateDialogForm.module.scss";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { getSpecie, getSpeciesAutocomplete } from "../../../../api/species";
import { CREATION_TYPE } from "../../../../constants/SelectOptions";
import { Button } from "../../../../components";
import { AdoptCreateRequest, CreationType } from "../../../../types/adopt";
import { createAdopt } from "../../../../api/adopts";
import { useTheme } from "../../../../context/ThemeProvider";
import DropdownComponent from "../../../../components/Form/DropdownComponent";
import {
  formatOwnerInfoForDropdown,
  formatSpecieInfoForDropdown,
  formatTraitInfoForDropdown,
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
import { OwnerDesignerCreateRequest } from "../../../../types/owner";
import { isDefined } from "../../../../tools/commons";
import { successToast } from "../../../../constants/toasts";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import ActionIcon from "../../../../components/surfaces/ActionIconComponent";
import { getTraitsAutocomplete } from "../../../../api/traits";
import { Container } from "@mui/system";
import { SubTraitCreateRequest } from "../../../../types/subTraits";
import { getRarityByString } from "../../utils/format";
import CatsLoading from "../../../../components/Loading/CatsLoading";

type AdoptsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const AdoptsCreateDialogForm = (props: AdoptsCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const [ownerOption, setOwnerOption] = useState<number>(0);
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [adoptName, setAdoptName] = useState("");
  const [owner, setOwner] = useState<AutocompleteOption | null>(null);
  const [notRegisteredOwner, setNotRegisteredOwner] = useState<string>("");
  const [specie, setSpecie] = useState<AutocompleteOption | null>(null);
  const [creationType, setCreationType] = useState<CreationType>("PREMADE");
  const [designersFields, setDesignersFields] = useState<number>(1);
  const [designersOption, setDesignersOption] = useState<number[]>([0]);
  const [designers, setDesigners] = useState<AutocompleteOption[]>([]);
  const [designersNotRegistered, setDesignersNotRegistered] = useState<
    string[]
  >(["", ""]);
  const [traitsFields, setTraitsFields] = useState<number>(1);
  const [traitsPayload, setTraitsPayload] = useState<SubTraitCreateRequest[]>([
    {},
  ]);
  const availableDesignerSection =
    creationType === "MYO" || creationType === "GUEST_ARTIST";

  useEffect(() => {
    clearStates();
    setOwnerOption(0);
    setDesignersFields(1);
    setDesignersOption([0]);
  }, [handleClose]);

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

  const { data: traitsOptions } = useQuery({
    queryKey: ["autocompleteTraits", specie?.value],
    queryFn: () => {
      return getTraitsAutocomplete({
        specieId: isDefined(specie) ? specie.value : "",
      });
    },
    enabled: isDefined(specie),
  });

  const { data: specieInfo, isLoading: isSpecieInfoLoading } = useQuery({
    queryKey: ["getSpecie", specie?.value],
    queryFn: () => {
      return getSpecie(isDefined(specie) ? specie.value : "");
    },
    enabled: isDefined(specie),
  });

  const { mutate: createAdoptMutation, isLoading } = useMutation({
    mutationFn: (data: AdoptCreateRequest) => {
      return createAdopt(data);
    },
    onSuccess: () => {
      successToast(strings.ADOPT_CREATE_SUCCESSFULLY);
      queryClient.invalidateQueries("adopts");
      queryClient.invalidateQueries("autocompleteOwners");
      clearStates();
      setOwnerOption(0);
      handleClose();
    },
  });

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
      designers: mergeDesigners(),
      subTraits: traitsPayload,
    };
    createAdoptMutation(payload);
  };

  const handleOwnerOption = (value: number) => {
    setOwnerOption(value);
    setOwner(null);
    setNotRegisteredOwner("");
  };

  const handleDesignersOption = (value: number, index?: number) => {
    if (isDefined(index)) {
      const newDesignersOption = [...designersOption];
      newDesignersOption[index] = value;
      setDesignersOption(newDesignersOption);
      if (value === 1) {
        const newDesigners = [...designers];
        newDesigners[index] = { label: " ", value: " " };
        setDesigners(newDesigners);
      } else if (value === 0) {
        const newDesignersNotRegistered = [...designersNotRegistered];
        newDesignersNotRegistered[index] = "";
        setDesignersNotRegistered(newDesignersNotRegistered);
      }
    }
  };

  const clearStates = () => {
    setAdoptName("");
    setOwner(null);
    setNotRegisteredOwner("");
    setSpecie(null);
    setCreationType("PREMADE");
    setDesignersFields(1);
    setDesignersOption([0]);
    setDesigners([]);
    setDesignersNotRegistered(["", ""]);
    setTraitsFields(1);
    setTraitsPayload([{}]);
  };

  const mergeDesigners = () => {
    const designersArray: OwnerDesignerCreateRequest[] = [];

    designers.forEach((designer) => {
      if (isDefined(designer) && designer.value !== " ") {
        designersArray.push({
          id: designer.value,
          notRegisteredDesigner: false,
        });
      }
    });

    designersNotRegistered.forEach((designer) => {
      if (isDefined(designer) && designer !== "") {
        designersArray.push({
          id: designer,
          notRegisteredDesigner: true,
        });
      }
    });
    return designersArray;
  };

  const handleChangeNotRegisteredDesigners = (value: string, index: number) => {
    const newDesignersNotRegistered = [...designersNotRegistered];
    newDesignersNotRegistered[index] = value;
    setDesignersNotRegistered(newDesignersNotRegistered);
  };

  const handleChangeDesigners = (value: AutocompleteOption, index: number) => {
    const newDesigners = [...designers];
    newDesigners[index] = value;
    setDesigners(newDesigners);
  };

  const addDesignerField = () => {
    setDesignersFields(designersFields + 1);
    const newDesignersOption = [...designersOption];
    newDesignersOption.push(0);
    setDesignersOption(newDesignersOption);
  };

  const deleteDesignerField = (index: number) => {
    const newDesignersOption = [...designersOption];
    const option = newDesignersOption[index];
    newDesignersOption.splice(index, 1);
    setDesignersOption(newDesignersOption);
    if (option === 0) {
      const newDesigners = [...designers];
      newDesigners.splice(index, 1);
      setDesigners(newDesigners);
    } else {
      const newDesignersNotRegistered = [...designersNotRegistered];
      newDesignersNotRegistered.splice(index, 1);
      setDesignersNotRegistered(newDesignersNotRegistered);
    }
    setDesignersFields(designersFields - 1);
  };

  const addTraitField = () => {
    setTraitsFields(traitsFields + 1);
    const newTraitsPayload = [...traitsPayload];
    newTraitsPayload.push({});
    setTraitsPayload(newTraitsPayload);
  };

  const handleTraitChange = (value: AutocompleteOption, index: number) => {
    const newTraitsPayload = [...traitsPayload];
    newTraitsPayload[index].mainTraitId = value.value;
    setTraitsPayload(newTraitsPayload);
  };

  const handleRarityChange = (value: string, index: number) => {
    const newTraitsPayload = [...traitsPayload];
    newTraitsPayload[index].rarity = getRarityByString(value);
    setTraitsPayload(newTraitsPayload);
  };

  const getRaritiesOptions = (index: number) => {
    const mainTrait = traitsOptions?.find(
      (trait) => trait.id === traitsPayload[index].mainTraitId
    );

    if (isDefined(mainTrait)) {
      return mainTrait?.rarities.map((rarity) => ({
        label: rarity,
        value: getRarityByString(rarity),
      }));
    }
    return [];
  };

  const handleAdditionalInfoChange = (value: string, index: number) => {
    const newTraitsPayload = [...traitsPayload];
    newTraitsPayload[index].additionalInfo = value;
    setTraitsPayload(newTraitsPayload);
  };

  const deleteTraitsField = (index: number) => {
    const newTraitsPayload = [...traitsPayload];
    newTraitsPayload.splice(index, 1);
    setTraitsPayload(newTraitsPayload);
    setTraitsFields(traitsFields - 1);
  };

  const getTraitsInformationImage = () => {
    if (isDefined(specie)) {
      if (isDefined(specieInfo?.traitSheetUrl)) {
        return <img src={specieInfo.traitSheetUrl} width={515} height={660} />;
      } else if (isSpecieInfoLoading) {
        return (
          <CatsLoading
            withDots={true}
            width="150px"
            colorDots={colors.CTX_MENUBAR_HOVER_COLOR}
          />
        );
      } else {
        return <div>{"This Specie not have a traits info"}</div>;
      }
    }
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      className={styles.formMainContainer}
      autoComplete="off"
    >
      <div className={styles.sectionsContainer}>
        <div className={styles.firstContainer}>
          {/* ------------------------------------------------------------------------------------------- */}
          {/*--------------------------------------PRINCIPAL SECTION--------------------------------------*/}
          {/* ------------------------------------------------------------------------------------------- */}
          <div className={styles.principalSectionContainer}>
            <TextComponent
              content={"Principal Information"}
              animation={false}
              hover={false}
            />

            <TextFieldComponent
              className={styles.textFieldForm}
              id="adoptName"
              label={strings.ADOPT_NAME}
              type="text"
              onChange={(e) => setAdoptName(e.target.value)}
              disabled={isLoading}
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
                  disabled={ownerOption === 0 || isLoading}
                  required={ownerOption === 1}
                />
              ) : (
                <TextFieldComponent
                  style={{ marginTop: "10px" }}
                  key={`owner_texField${ownerOption}`}
                  id="owner"
                  label={strings.NOT_REGISTERED_OWNER}
                  type="text"
                  value={notRegisteredOwner}
                  onChange={(e) => setNotRegisteredOwner(e.target.value)}
                  required
                  disabled={isLoading}
                />
              )}
            </div>

            <AutocompleteComponent
              label={strings.SPECIE}
              options={formatSpecieInfoForDropdown(speciesOptions)}
              handleChange={(value: AutocompleteOption) => setSpecie(value)}
              required
              disabled={isLoading}
            />

            <DropdownComponent
              name={strings.CREATION_TYPE}
              label={"creationType"}
              value={creationType}
              handleChange={(e) => setCreationType(e.target.value)}
              options={CREATION_TYPE}
              disabled={isLoading}
            />
          </div>
          {/* ------------------------------------------------------------------------------------------- */}
          {/*--------------------------------------DESIGNERS SECTION--------------------------------------*/}
          {/* ------------------------------------------------------------------------------------------- */}
          <div
            className={styles.designerSectionContainer}
            style={{
              filter: !availableDesignerSection ? "grayscale(100%)" : "none",
            }}
          >
            <div className={styles.sectionTitleContainer}>
              <TextComponent
                content={"Designers Information"}
                animation={false}
                hover={false}
              />

              <ActionIcon
                Icon={ControlPointRoundedIcon}
                fontsize="large"
                handleClick={addDesignerField}
                disabled={
                  !availableDesignerSection ||
                  designersFields === 2 ||
                  isLoading
                }
              />
            </div>
            <div className={styles.designersContainer}>
              {Array.from(Array(designersFields).keys()).map((index) => (
                <div
                  key={`designer_container${index}`}
                  className={styles.designerContainer}
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
                    disabled={!availableDesignerSection || isLoading}
                  />
                  {designersOption[index] !== 1 ? (
                    <AutocompleteComponent
                      key={`owner_autocomplete${ownerOption}`}
                      label={"Designer " + (index + 1)}
                      options={formatOwnerInfoForDropdown(ownersResponse)}
                      handleChange={(value: AutocompleteOption) =>
                        handleChangeDesigners(value, index)
                      }
                      disabled={!availableDesignerSection || isLoading}
                      required={
                        designersOption[index] === 0 && availableDesignerSection
                      }
                    />
                  ) : (
                    <TextFieldComponent
                      style={{ marginTop: "10px", width: "100%" }}
                      key={`owner_texField${ownerOption}`}
                      id="owner"
                      label={"Designer " + (index + 1)}
                      type="text"
                      value={designersNotRegistered[index]}
                      onChange={(e) =>
                        handleChangeNotRegisteredDesigners(
                          e.target.value,
                          index
                        )
                      }
                      disabled={!availableDesignerSection || isLoading}
                      required={
                        designersOption[index] === 1 && availableDesignerSection
                      }
                    />
                  )}

                  <ActionIcon
                    Icon={DeleteForeverRoundedIcon}
                    fontsize="large"
                    handleClick={() => deleteDesignerField(index)}
                    disabled={
                      !availableDesignerSection ||
                      designersFields === 1 ||
                      isLoading
                    }
                    marginTop="5px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------- */}
        {/*--------------------------------------TRAITS SECTION--------------------------------------*/}
        {/* ------------------------------------------------------------------------------------------- */}
        <Container
          className={styles.sectionTraitsContainer}
          sx={{
            //-webkit-scrollbar
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: colors.CTX_FORM_CONTAINER_COLOR,
            },
            "&::-webkit-scrollbar-thumb": {
              background: colors.CTX_MENUBAR_COLOR,
            },
          }}
        >
          <div className={styles.titleTraitsContainer}>
            <TextComponent
              content={"Traits Information"}
              animation={false}
              hover={false}
            />
            <ActionIcon
              Icon={ControlPointRoundedIcon}
              fontsize="large"
              handleClick={addTraitField}
              disabled={isLoading}
            />
          </div>
          <div className={styles.traitsContainer}>
            {Array.from(Array(traitsFields).keys()).map((index) => (
              <div
                key={`trait_container${index}`}
                className={styles.singleTraitContainer}
              >
                <AutocompleteComponent
                  label={strings.TRAIT + (index + 1)}
                  options={formatTraitInfoForDropdown(traitsOptions)}
                  handleChange={(value: AutocompleteOption) => {
                    handleTraitChange(value, index);
                  }}
                  disabled={isLoading || !isDefined(specie)}
                />
                <DropdownComponent
                  name={strings.RARITY}
                  label={`trait${index}`}
                  value={traitsPayload[index].rarity || ""}
                  handleChange={(e) =>
                    handleRarityChange(e.target.value, index)
                  }
                  options={getRaritiesOptions(index)}
                  disabled={isLoading || !isDefined(specie)}
                  required={isDefined(traitsPayload[index].mainTraitId)}
                />

                <TextFieldComponent
                  className={styles.textFieldForm}
                  style={{
                    marginTop: "1.5rem",
                  }}
                  id={`trait${index}`}
                  label={strings.ADDITIONAL_INFO}
                  type="text"
                  onChange={(e) =>
                    handleAdditionalInfoChange(e.target.value, index)
                  }
                  value={traitsPayload[index].additionalInfo || ""}
                  disabled={isLoading || !isDefined(specie)}
                />
                <ActionIcon
                  Icon={DeleteForeverRoundedIcon}
                  fontsize="large"
                  handleClick={() => deleteTraitsField(index)}
                  disabled={traitsFields === 0 || isLoading}
                  marginTop="5px"
                />
              </div>
            ))}
          </div>
        </Container>
        <div className={styles.sectionTraitInfoContainer}>
          {getTraitsInformationImage()}
        </div>
      </div>
      <div className={styles.submitButton}>
        <Button
          type="submit"
          content={strings.CREATE}
          width="150px"
          height="35px"
          colorButton={colors.CTX_FORM_BUTTON_COLOR}
          buttonColorShadow={colors.CTX_BUTTON_SHADOW_COLOR_2}
          loading={isLoading}
          disabled={isLoading}
          catsLoading={isLoading}
        />
      </div>
    </form>
  );

  return (
    <DialogComponent
      dialogTitle={`${strings.CREATE} ${strings.ADOPT}`}
      open={open}
      handleClose={handleClose}
      content={dialogContent}
      fullScreen={true}
      withoutPadding={true}
    />
  );
};

export default AdoptsCreateDialogForm;
