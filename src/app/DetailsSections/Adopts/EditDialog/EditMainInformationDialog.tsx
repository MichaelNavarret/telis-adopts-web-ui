import DialogComponent from "../../../../components/surfaces/DialogComponent";
import strings from "../../../../l10n";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import {
  formatOwnerInfoForDropdown,
  formatSpecieInfoForDropdown,
} from "../../../../tools/dropdown";
import { getSpeciesAutocomplete } from "../../../../api/species";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";
import { Button } from "../../../../components";
import styles from "./EditDialog.module.scss";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { FormProvider, useForm } from "react-hook-form";
import TextFieldComponent from "../../../../components/HookForm/TextFieldComponent";
import AutocompleteComponent, {
  autocompleteValue,
} from "../../../../components/HookForm/AutocompleteComponent";
import { formatDateToFormField } from "../../../../tools/commons";
import DropdownComponent from "../../../../components/HookForm/DropdownComponent";
import { CREATION_TYPE } from "../../../../constants/SelectOptions";

type EditMainInformationDialogProps = {
  open: boolean;
  adopt?: AdoptInfo;
  handleClose: () => void;
};

type UpdateAdoptFormField = {
  name: string;
  specieId: string;
  createdOn: string;
  ownerId: string;
  creationType: string;
};

export const EditMainInformationDialog = (
  props: EditMainInformationDialogProps
) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const form = useForm<UpdateAdoptFormField>();
  const { handleSubmit } = form;

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

  const onSubmit = (data: UpdateAdoptFormField) => {
    const payload: AdoptUpdateRequest = {
      name: data.name,
      specieId: autocompleteValue(data.specieId),
      createdOn: data.createdOn,
      ownerId: autocompleteValue(data.ownerId),
      creationType: data.creationType,
    };
    updateInformation(payload);
  };

  const dialogContent = (
    <FormProvider {...form}>
      <form
        autoComplete="off"
        className={styles.editMainInformationFormContainer}
      >
        <TextFieldComponent
          type="text"
          name="name"
          id="name"
          label={strings.NAME}
          initialValue={adopt?.name}
        />
        <AutocompleteComponent
          label={strings.SPECIE}
          options={formatSpecieInfoForDropdown(speciesOptions)}
          name="specieId"
          initialValue={{
            label: adopt?.specieName || "",
            value: adopt?.specieId || "",
          }}
          required
        />
        <TextFieldComponent
          type="date"
          id="createdOn"
          label={strings.CREATED_ON}
          name="createdOn"
          initialValue={formatDateToFormField(adopt?.createdOn)}
        />
        <AutocompleteComponent
          label={strings.OWNER}
          options={formatOwnerInfoForDropdown(ownersResponse)}
          name="ownerId"
          initialValue={{
            label: adopt?.ownerName || "",
            value: adopt?.ownerId || "",
          }}
        />
        <DropdownComponent
          label={strings.CREATION_TYPE}
          options={CREATION_TYPE}
          name="creationType"
          initialValue={adopt?.creationType}
        />

        <Button
          type="submit"
          content={strings.UPDATE}
          onClick={handleSubmit(onSubmit)}
          disabled={isUpdateInformationLoading}
          loading={isUpdateInformationLoading}
          catsLoading={isUpdateInformationLoading}
          withShadow={false}
        />
      </form>
    </FormProvider>
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
