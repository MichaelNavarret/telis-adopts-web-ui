import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import styles from "./AdoptsCreateDialogForm.module.scss";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { getSpecie, getSpeciesAutocomplete } from "../../../../api/species";
import { CREATION_TYPE } from "../../../../constants/SelectOptions";
import { Button } from "../../../../components";
import { AdoptCreateRequest, CreationType } from "../../../../types/adopt";
import { createAdopt, uploadAdoptIcon } from "../../../../api/adopts";
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
import { OwnerDesignerCreateRequest } from "../../../../types/owner";
import { isDefined } from "../../../../tools/commons";
import { errorToast, successToast } from "../../../../constants/toasts";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import ActionIcon from "../../../../components/surfaces/ActionIconComponent";
import { getTraitsAutocomplete } from "../../../../api/traits";
import { Container } from "@mui/system";
import { SubTraitCreateRequest } from "../../../../types/subTraits";
import { getRarityByString } from "../../utils/format";
import CatsLoading from "../../../../components/Loading/CatsLoading";
import { TraitInfo } from "../../../../types/traits";
import { Checkbox } from "@mui/material";
import AdoptIconDropzone from "./components/AdoptIconDropzone";
import SpecieFormExpositor from "./components/SpecieFormExpositor";

type AdoptsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const AdoptsCreateDialogForm = (props: AdoptsCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const [icon, setIcon] = useState<File | undefined>();
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
  const [specieFormId, setSpecieFormId] = useState<string>("");
  const [designersNotRegistered, setDesignersNotRegistered] = useState<
    string[]
  >(["", ""]);
  const [traitsFields, setTraitsFields] = useState<TraitInfo[] | undefined>();
  const [availableTraits, setAvailableTraits] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
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

  const {} = useQuery({
    queryKey: ["autocompleteTraits", specie?.value],
    queryFn: () => {
      return getTraitsAutocomplete({
        specieId: isDefined(specie) ? specie.value : "",
      });
    },
    onSuccess: (data) => {
      const traitsOrderByDisplayPriority = data.sort(
        (a, b) => a.displayPriority - b.displayPriority
      );
      setTraitsFields(traitsOrderByDisplayPriority);
      setTraitsPayload(
        traitsOrderByDisplayPriority.map((trait) => ({
          mainTraitId: trait.id,
        }))
      );
      data.map((trait) => {
        setChecked((checked) => [...checked, true]);
        setAvailableTraits((availableTraits) => [...availableTraits, trait.id]);
      });
    },
    enabled: isDefined(specie),
    refetchOnWindowFocus: false,
  });

  const { data: specieInfo, isLoading: isSpecieInfoLoading } = useQuery({
    queryKey: ["getSpecie", specie?.value],
    queryFn: () => {
      return getSpecie(isDefined(specie) ? specie.value : "");
    },
    enabled: isDefined(specie),
    refetchOnWindowFocus: false,
  });

  const { mutate: createAdoptMutation, isLoading } = useMutation({
    mutationFn: (data: AdoptCreateRequest) => {
      return createAdopt(data);
    },
    onSuccess: (data) => {
      successToast(strings.ADOPT_CREATE_SUCCESSFULLY);
      if (isDefined(icon)) {
        uploadIconMutation(data.id);
      } else {
        queryClient.invalidateQueries("adopts");
        queryClient.invalidateQueries("autocompleteOwners");
        clearStates();
        setOwnerOption(0);
        handleClose();
      }
    },
  });

  const { mutate: uploadIconMutation, isLoading: isUploadIconLoading } =
    useMutation({
      mutationFn: (adoptId: string) => {
        return uploadAdoptIcon(icon as File, adoptId);
      },
      onSuccess: () => {
        successToast(strings.ADOPT_ICON_UPLOAD_SUCCESSFULLY);
        queryClient.invalidateQueries("adopts");
        queryClient.invalidateQueries("autocompleteOwners");
        clearStates();
        setOwnerOption(0);
        handleClose();
      },
      onError: () => {
        errorToast(strings.ADOPT_ICON_UPLOAD_FAILED);
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
      subTraits: filteredTraitsPayload(traitsPayload),
      specieFormId: specieFormId,
    };
    createAdoptMutation(payload);
  };

  const filteredTraitsPayload = (payload: SubTraitCreateRequest[]) => {
    const newPayload = payload.filter((trait) =>
      availableTraits.find(
        (availableTrait) => availableTrait === trait.mainTraitId
      )
    );
    return newPayload;
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

  const handleRarityChange = (value: string, id: string) => {
    const newTraitsPayload = [...traitsPayload];
    const index = newTraitsPayload.findIndex(
      (trait) => trait.mainTraitId === id
    );
    newTraitsPayload[index].rarity = getRarityByString(value);
    setTraitsPayload(newTraitsPayload);
  };

  const handleAdditionalInfoChange = (value: string, id: string) => {
    const newTraitsPayload = [...traitsPayload];
    const index = newTraitsPayload.findIndex(
      (trait) => trait.mainTraitId === id
    );
    newTraitsPayload[index].additionalInfo = value;
    setTraitsPayload(newTraitsPayload);
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

  const getRaritiesOptions = (trait: TraitInfo) => {
    const options = trait.rarities.map((rarity) => ({
      label: rarity,
      value: getRarityByString(rarity),
    }));
    return options;
  };

  const handleDisableTraits = (index: number, traitId: string) => {
    const newChecked = [...checked];
    newChecked[index] = !checked[index];
    setChecked(newChecked);

    const newDisabledTraits = [...availableTraits];
    if (newDisabledTraits.find((trait) => trait === traitId)) {
      newDisabledTraits.splice(
        newDisabledTraits.findIndex((trait) => trait === traitId),
        1
      );
    } else {
      newDisabledTraits.push(traitId);
    }
    setAvailableTraits(newDisabledTraits);
  };

  const isAvailableTrait = (traitId: string) => {
    return isDefined(availableTraits.find((trait) => trait === traitId));
  };

  const handleSpecieFormClick = (value: string) => {
    setSpecieFormId(value);
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      className={styles.formMainContainer}
      autoComplete="off"
    >
      <div className={styles.firstContainer}>
        <div className={styles.adoptInfoSection}>
          <AdoptIconDropzone
            className={styles.iconAdoptField}
            handleDrop={(files) => {
              setIcon(files[0]);
            }}
            disabled={isLoading}
          />
          <div className={styles.fieldsContainer}>
            <TextComponent
              content={"Adopt Information"}
              animation={false}
              hover={false}
            />
            <TextFieldComponent
              id="adoptName"
              label={strings.ADOPT_NAME}
              type="text"
              onChange={(e) => setAdoptName(e.target.value)}
              disabled={isLoading || isUploadIconLoading}
            />
            <AutocompleteComponent
              label={strings.SPECIE}
              options={formatSpecieInfoForDropdown(speciesOptions)}
              handleChange={(value: AutocompleteOption) => setSpecie(value)}
              required
              disabled={isLoading || isUploadIconLoading}
            />

            <DropdownComponent
              name={strings.CREATION_TYPE}
              label={"creationType"}
              value={creationType}
              handleChange={(e) => setCreationType(e.target.value)}
              options={CREATION_TYPE}
              disabled={isLoading || isUploadIconLoading}
            />
          </div>
        </div>
        <div className={styles.ownerInfoSection}>
          <TextComponent content={"Owner"} animation={false} hover={false} />
          <div>
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
                disabled={ownerOption === 0 || isLoading || isUploadIconLoading}
                required={ownerOption === 1}
              />
            ) : (
              <TextFieldComponent
                style={{ width: "100%" }}
                key={`owner_texField${ownerOption}`}
                id="owner"
                label={strings.NOT_REGISTERED_OWNER}
                type="text"
                value={notRegisteredOwner}
                onChange={(e) => setNotRegisteredOwner(e.target.value)}
                required
                disabled={isLoading || isUploadIconLoading}
              />
            )}
          </div>
        </div>
        <Container
          className={styles.designersInfoSection}
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
          <div className={styles.sectionTitleContainer}>
            <TextComponent
              content={"Designers Information"}
              animation={false}
              hover={false}
              colorText={
                !availableDesignerSection || isLoading || isUploadIconLoading
                  ? "gray"
                  : undefined
              }
            />

            <ActionIcon
              Icon={ControlPointRoundedIcon}
              fontsize="large"
              handleClick={addDesignerField}
              disabled={
                !availableDesignerSection ||
                designersFields === 2 ||
                isLoading ||
                isUploadIconLoading
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
                  disabled={
                    !availableDesignerSection ||
                    isLoading ||
                    isUploadIconLoading
                  }
                />
                {designersOption[index] !== 1 ? (
                  <AutocompleteComponent
                    key={`owner_autocomplete${ownerOption}`}
                    label={"Designer " + (index + 1)}
                    options={formatOwnerInfoForDropdown(ownersResponse)}
                    handleChange={(value: AutocompleteOption) =>
                      handleChangeDesigners(value, index)
                    }
                    disabled={
                      !availableDesignerSection ||
                      isLoading ||
                      isUploadIconLoading
                    }
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
                      handleChangeNotRegisteredDesigners(e.target.value, index)
                    }
                    disabled={
                      !availableDesignerSection ||
                      isLoading ||
                      isUploadIconLoading
                    }
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
                    isLoading ||
                    isUploadIconLoading
                  }
                  marginTop="5px"
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className={styles.secondContainer}>
        <Container
          className={styles.traitsSection}
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
          </div>
          <div className={styles.traitsContainer}>
            {traitsFields?.map((trait, index) => (
              <div
                key={`trait_container${index}`}
                className={styles.traitContainer}
              >
                <div
                  className={styles.titleTraitContainer}
                  onClick={() => handleDisableTraits(index, trait.id)}
                >
                  <Checkbox checked={checked[index]} />
                  <p
                    style={{
                      color: isAvailableTrait(trait.id)
                        ? colors.CTX_MENUBAR_COLOR
                        : "gray",
                      fontSize: "11px",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    {trait.trait}
                  </p>
                </div>
                <DropdownComponent
                  label={"rarity"}
                  options={getRaritiesOptions(trait)}
                  width="35%"
                  value={
                    traitsPayload.find(
                      (traitPayload) => traitPayload.mainTraitId === trait.id
                    )?.rarity
                  }
                  handleChange={(e) =>
                    handleRarityChange(e.target.value, trait.id)
                  }
                  disabled={
                    isLoading ||
                    isUploadIconLoading ||
                    !isAvailableTrait(trait.id)
                  }
                  required={isAvailableTrait(trait.id)}
                />
                <TextFieldComponent
                  label={strings.ADDITIONAL_INFO + " " + (index + 1)}
                  id="trait"
                  type="text"
                  value={
                    traitsPayload.find(
                      (traitPayload) => traitPayload.mainTraitId === trait.id
                    )?.additionalInfo
                  }
                  onChange={(e) =>
                    handleAdditionalInfoChange(e.target.value, trait.id)
                  }
                  disabled={
                    isLoading ||
                    isUploadIconLoading ||
                    !isAvailableTrait(trait.id)
                  }
                />
              </div>
            ))}
          </div>
        </Container>
        <div className={styles.formSpecieSection}>
          {specieInfo && specieInfo.specieFormInfoList && (
            <SpecieFormExpositor
              specieFormList={specieInfo?.specieFormInfoList || []}
              borderColor={colors.CTX_BORDER_ICON_COLOR}
              handleClick={handleSpecieFormClick}
            />
          )}
        </div>
      </div>
      <div className={styles.thirdContainer}>{getTraitsInformationImage()}</div>
      <div className={styles.submitButton}>
        <Button
          type="submit"
          content={strings.CREATE}
          width="150px"
          height="35px"
          colorButton={colors.CTX_FORM_BUTTON_COLOR}
          buttonColorShadow={colors.CTX_BUTTON_SHADOW_COLOR_2}
          loading={isLoading || isUploadIconLoading}
          disabled={isLoading || isUploadIconLoading}
          catsLoading={isLoading || isUploadIconLoading}
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
