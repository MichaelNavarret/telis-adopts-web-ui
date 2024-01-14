import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "./TraitsCreateDialogForm.module.scss";
import { Button } from "../../../../components";
import { getSpecie, getSpeciesAutocomplete } from "../../../../api/species";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import { TraitCreateRequest, TraitInfo } from "../../../../types/traits";
import { createTrait, getTraitsAutocomplete } from "../../../../api/traits";
import { formatSpecieInfoForDropdown } from "../../../../tools/dropdown";
import strings from "../../../../l10n";
import MenuButton from "../../../../components/surfaces/MenuButton";
import { MenuButtonRarityOptions } from "../../utils/MenuButtonOptions";
import AutocompleteComponent, {
  AutocompleteOption,
} from "../../../../components/Form/AutocompleteComponent";
import { errorToast, successToast } from "../../../../constants/toasts";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { Divider } from "@mui/material";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { traitsCreateDialogFormTable } from "./traitsCreateDialogFormTable";

type TraitsCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const TraitsCreateDialogForm = (props: TraitsCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const [specie, setSpecie] = useState<AutocompleteOption | null>(null);
  const [multipleStep, setMultipleStep] = useState<number[]>([]);
  const [trait, setTrait] = useState<string>("");
  const [displayPriority, setDisplayPriority] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { state } = useDataTable();

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const { data: specieInfo } = useQuery({
    queryKey: ["specieInfo", specie?.value],
    queryFn: () => {
      return getSpecie(specie?.value || "");
    },
    enabled: !!specie,
  });

  const { data: traits } = useQuery({
    queryKey: ["traitsTable", specie?.value],
    queryFn: () => {
      return getTraitsAutocomplete({
        specieId: specie?.value || "",
      });
    },
    enabled: !!specie,
  });

  const { mutate: createTraitMutation, isLoading } = useMutation({
    mutationFn: (data: TraitCreateRequest) => {
      return createTrait(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("traits");
      successToast(strings.TRAIT_CREATE_SUCCESSFULLY);
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
    if (!validateMultipleStep()) return;
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
      displayPriority: displayPriority,
    };
    createTraitMutation(payload);
  };

  const validateMultipleStep = () => {
    if (multipleStep.length === 0) {
      errorToast(strings.SELECT_AT_LEAST_ONE_RARITY);
      return false;
    }
    return true;
  };

  const handleMultipleStep = (value: number) => {
    if (multipleStep.includes(value)) {
      setMultipleStep((prev) => prev.filter((item) => item !== value));
    } else {
      setMultipleStep((prev) => [...prev, value]);
    }
  };

  const orderTraitsByDisplayPriority = (traits: TraitInfo[]) => {
    return traits.sort((a, b) => a.displayPriority - b.displayPriority);
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      className={styles.formMainContainer}
      autoComplete="off"
    >
      <div className={styles.principalSectionContainer}>
        <AutocompleteComponent
          label={strings.SPECIE}
          options={formatSpecieInfoForDropdown(speciesOptions)}
          handleChange={(value: AutocompleteOption) => setSpecie(value)}
          required
          disabled={isLoading}
        />
        <MenuButton
          options={MenuButtonRarityOptions}
          handleClick={handleMultipleStep}
          selectMultiple
          disabled={isLoading}
        />
        <TextFieldComponent
          className={styles.textFieldForm}
          id="trait"
          label={strings.TRAIT}
          type="text"
          onChange={(e) => setTrait(e.target.value)}
          required
          disabled={isLoading}
        />

        <TextFieldComponent
          className={styles.textFieldForm}
          id="displayPriority"
          label={"Display Priority"}
          type="number"
          onChange={(e) => setDisplayPriority(Number(e.target.value))}
          required
          min={1}
          disabled={isLoading}
        />

        {traits && traits.length > 0 && (
          <div className={styles.tableContainer}>
            <TableComponent
              columns={traitsCreateDialogFormTable}
              data={orderTraitsByDisplayPriority(traits) || []}
              state={state}
              withPagination={false}
            />
          </div>
        )}

        <Button
          className={styles.submitButton}
          content={strings.CREATE}
          type="submit"
          width="150px"
          height="35px"
          disabled={isLoading}
          loading={isLoading}
          catsLoading={isLoading}
        />
      </div>

      <div className={styles.traitSheetContainer}>
        {specieInfo?.traitSheetUrl ? (
          <img src={specieInfo?.traitSheetUrl} width={515} height={660} />
        ) : (
          <p>
            {
              "The trait sheet cannot be loaded. Maybe the specie not have, or is a network problem. "
            }
          </p>
        )}
      </div>
    </form>
  );

  return (
    <DialogComponent
      dialogTitle={`${strings.CREATE} ${strings.TRAIT}`}
      open={open}
      handleClose={handleClose}
      content={dialogContent}
      height="800px"
      maxWidth="lg"
    />
  );
};

export default TraitsCreateDialogForm;
