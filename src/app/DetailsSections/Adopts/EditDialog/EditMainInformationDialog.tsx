import { FormEvent, useEffect, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import strings from "../../../../l10n";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import AutocompleteComponent, {
  AutocompleteOption,
} from "../../../../components/Form/AutocompleteComponent";
import { formatSpecieInfoForDropdown } from "../../../../tools/dropdown";
import { getSpeciesAutocomplete } from "../../../../api/species";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";
import { Button } from "../../../../components";
import styles from "./EditDialog.module.scss";
import { formatDate, formatDateToFormField } from "../../../../tools/commons";

type EditMainInformationDialogProps = {
  open: boolean;
  adopt?: AdoptInfo;
  handleClose: () => void;
};

export const EditMainInformationDialog = (
  props: EditMainInformationDialogProps
) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const [name, setName] = useState("");
  const [specie, setSpecie] = useState<AutocompleteOption>();
  const [createdOn, setCreatedOn] = useState("");

  useEffect(() => {
    if (adopt) {
      setName(adopt.name);
      setSpecie({
        label: adopt.specieName,
        value: adopt.specieId,
      });
      setCreatedOn(formatDateToFormField(adopt.createdOn));
    }
  }, [adopt, handleClose]);

  const { mutate: updateInformation, isLoading: isUpdateInformationLoading } =
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

  const { data: speciesOptions } = useQuery({
    queryKey: ["autocompleteSpecies"],
    queryFn: () => {
      return getSpeciesAutocomplete();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: AdoptUpdateRequest = {
      name,
      specieId: specie?.value || "",
      createdOn,
    };
    updateInformation(payload);
  };

  const dialogContent = (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className={styles.editMainInformationFormContainer}
    >
      <TextFieldComponent
        type="text"
        id="name"
        label={strings.NAME}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <AutocompleteComponent
        label={strings.SPECIE}
        options={formatSpecieInfoForDropdown(speciesOptions)}
        handleChange={(value: AutocompleteOption) => setSpecie(value)}
        value={specie}
      />
      <TextFieldComponent
        type="date"
        id="createdOn"
        label={strings.CREATED_ON}
        value={createdOn}
        onChange={(e) => setCreatedOn(e.target.value)}
      />
      <Button
        type="submit"
        content={strings.UPDATE}
        disabled={isUpdateInformationLoading}
        loading={isUpdateInformationLoading}
        catsLoading={isUpdateInformationLoading}
        withShadow={false}
      />
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      content={dialogContent}
      dialogTitle={strings.MAIN_INFORMATION}
    />
  );
};
