import { useMutation, useQuery, useQueryClient } from "react-query";
import { AdoptInfo, AdoptUpdateRequest } from "../../../../types/adopt";
import { FormProvider, useForm } from "react-hook-form";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";
import strings from "../../../../l10n";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { getSpeciesAutocomplete } from "../../../../api/species";
import AutocompleteComponent, {
  autocompleteValue,
} from "../../../../components/HookForm/AutocompleteComponent";
import styles from "./EditMainInfoBlade.module.scss";
import TextFieldComponent from "../../../../components/HookForm/TextFieldComponent";
import {
  formatOwnerInfoForDropdown,
  formatSpecieInfoForDropdown,
} from "../../../../tools/dropdown";
import { formatDateToFormField } from "../../../../tools/commons";
import DropdownComponent from "../../../../components/HookForm/DropdownComponent";
import {
  ACTIVE_STATUS_OPTIONS,
  CREATION_TYPE,
} from "../../../../constants/SelectOptions";
import { Button, Container } from "../../../../components";
import Blade from "../../../../components/fc_components/Blade";

type EditMainInfoBladeProps = {
  open: boolean;
  handleClose: () => void;
  adopt?: AdoptInfo;
};

type EditMainInfoFormFields = {
  name: string;
  specieId: string;
  createdOn: string;
  ownerId: string;
  creationType: string;
  toyhouseLink: string;
  active: string;
};

const EditMainInfoBlade = (props: EditMainInfoBladeProps) => {
  const queryClient = useQueryClient();
  const { open, adopt, handleClose } = props;
  const form = useForm<EditMainInfoFormFields>();
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

  const onSubmit = (data: EditMainInfoFormFields) => {
    const payload: AdoptUpdateRequest = {
      name: data.name,
      specieId: autocompleteValue(data.specieId),
      createdOn: data.createdOn,
      ownerId: autocompleteValue(data.ownerId),
      creationType: data.creationType,
      toyhouseLink: data.toyhouseLink,
      active: data.active === "1" ? true : false,
    };
    updateInformation(payload);
  };
  console.table(adopt);
  const bladeContent = (
    <FormProvider {...form}>
      <Container className={styles.mainFormContainer}>
        <Container className={styles.firstSection}>
          <TextFieldComponent
            type="text"
            name="name"
            id="name"
            label={strings.NAME}
            initialValue={adopt?.name}
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
        </Container>

        <Container className={styles.secondSection}>
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
          <DropdownComponent
            label={strings.CREATION_TYPE}
            options={CREATION_TYPE}
            name="creationType"
            initialValue={adopt?.creationType}
          />
        </Container>
        <TextFieldComponent
          type="text"
          id="toyhouseLink"
          label={strings.TOYHOUSE}
          name="toyhouseLink"
          initialValue={adopt?.toyhouseLink}
        />
        <DropdownComponent
          label={strings.STATUS}
          options={ACTIVE_STATUS_OPTIONS}
          name="active"
          initialValue={adopt?.active ? "1" : "0"}
        />
      </Container>
    </FormProvider>
  );

  const bladeFooter = (
    <Container className={styles.footerContainer}>
      <Button
        content={strings.CANCEL}
        onClick={handleClose}
        withShadow={false}
        width="130px"
        height="30px"
        disabled={isUpdateInformationLoading}
      />
      <Button
        content={strings.UPDATE}
        onClick={handleSubmit(onSubmit)}
        withShadow={false}
        catsLoading={isUpdateInformationLoading}
        width="130px"
        height="30px"
        disabled={isUpdateInformationLoading}
      />
    </Container>
  );

  return (
    <Blade
      title={strings.ADD_DESIGNER}
      bodyNode={bladeContent}
      footerNode={bladeFooter}
      open={open}
      onClose={handleClose}
    />
  );
};

export default EditMainInfoBlade;
