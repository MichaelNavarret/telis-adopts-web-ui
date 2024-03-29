import { FormEvent, useState } from "react";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import { TraitInfo } from "../../../../types/traits";
import { SubTraitCreateRequest } from "../../../../types/subTraits";
import styles from "./EditDialog.module.scss";
import { Checkbox } from "@mui/material";
import { isDefined } from "../../../../tools/commons";
import { useTheme } from "../../../../context/ThemeProvider";
import DropdownComponent from "../../../../components/Form/DropdownComponent";
import { getRarityByString } from "../../../AdminSettings/utils/format";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import strings from "../../../../l10n";
import { Button } from "../../../../components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTraitsAutocomplete } from "../../../../api/traits";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";

type EditTraitsDialogProps = {
  open: boolean;
  adopt?: AdoptInfo;
  handleClose: () => void;
};

const EditTraitsDialog = (props: EditTraitsDialogProps) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const { colors } = useTheme();
  const [traitsFields, setTraitsFields] = useState<TraitInfo[] | undefined>();
  const [availableTraits, setAvailableTraits] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [traitsPayload, setTraitsPayload] = useState<SubTraitCreateRequest[]>([
    {},
  ]);

  const { mutate: updateTraitsMutation, isLoading: isUpdateTraitsMutation } =
    useMutation({
      mutationFn: (data: AdoptUpdateRequest) => {
        return updateAdopt(adopt?.id || "", data);
      },
      onSuccess: () => {
        successToast(strings.ADOPT_UPDATE_SUCCESSFULLY);
        queryClient.invalidateQueries(["adoptDetails", adopt?.id]);
        handleClose();
      },
    });

  useQuery({
    queryKey: ["autocompleteTraits", adopt?.specieId],
    queryFn: () => {
      return getTraitsAutocomplete({
        specieId: adopt?.specieId || "",
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
    enabled: isDefined(adopt),
    refetchOnWindowFocus: false,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptUpdateRequest = {
      subTraits: filteredTraitsPayload(traitsPayload),
    };
    updateTraitsMutation(payload);
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

  const getRaritiesOptions = (trait: TraitInfo) => {
    const options = trait.rarities.map((rarity) => ({
      label: rarity,
      value: getRarityByString(rarity),
    }));
    return options;
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

  const filteredTraitsPayload = (payload: SubTraitCreateRequest[]) => {
    const newPayload = payload.filter((trait) =>
      availableTraits.find(
        (availableTrait) => availableTrait === trait.mainTraitId
      )
    );
    return newPayload;
  };

  const dialogContent = (
    <form
      className={styles.formTraitsContainer}
      onSubmit={onSubmit}
      autoComplete="off"
    >
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
              width="100%"
              value={
                traitsPayload.find(
                  (traitPayload) => traitPayload.mainTraitId === trait.id
                )?.rarity
              }
              handleChange={(e) => handleRarityChange(e.target.value, trait.id)}
              disabled={!isAvailableTrait(trait.id)}
              required={isAvailableTrait(trait.id)}
            />
            <TextFieldComponent
              label={strings.ADDITIONAL_INFO + " " + (index + 1)}
              id="trait"
              type="text"
              className={styles.additionalInfo}
              value={
                traitsPayload.find(
                  (traitPayload) => traitPayload.mainTraitId === trait.id
                )?.additionalInfo
              }
              onChange={(e) =>
                handleAdditionalInfoChange(e.target.value, trait.id)
              }
              disabled={!isAvailableTrait(trait.id)}
            />
          </div>
        ))}
      </div>
      <Button
        type="submit"
        content={strings.UPDATE}
        width="150px"
        height="35px"
        withShadow={false}
        colorButton={colors.CTX_FORM_BUTTON_COLOR}
        buttonColorShadow={colors.CTX_BUTTON_SHADOW_COLOR_2}
        className={styles.submitButton}
        loading={isUpdateTraitsMutation}
        disabled={isUpdateTraitsMutation}
        catsLoading={isUpdateTraitsMutation}
      />
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      content={dialogContent}
      dialogTitle={"Edit Traits"}
      maxWidth="xl"
      width="60%"
    />
  );
};

export default EditTraitsDialog;
