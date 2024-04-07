import { useForm, FormProvider } from "react-hook-form";
import { Button, Container } from "../../../../components";
import strings from "../../../../l10n";
import { formatOwnerInfoForDropdown } from "../../../../tools/dropdown";
import { getOwnersAutocomplete } from "../../../../api/owners";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Blade from "../../../../components/fc_components/Blade";
import styles from "./AddDesignerBlade.module.scss";
import { AdoptUpdateRequest } from "../../../../types/adopt";
import { updateAdopt } from "../../../../api/adopts";
import { successToast } from "../../../../constants/toasts";
import AutocompleteComponent, {
  autocompleteValue,
} from "../../../../components/HookForm/AutocompleteComponent";
import { OwnerInfo } from "../../../../types/owner";
import { isDefined } from "../../../../tools/commons";

type AddDesignerBladeProps = {
  open: boolean;
  handleClose: () => void;
  adoptId: string;
  designersIds: string[];
};

type AddDesignerForm = {
  designerId: string;
};

const AddDesignerBlade = (props: AddDesignerBladeProps) => {
  const { open, handleClose, adoptId, designersIds } = props;
  const form = useForm<AddDesignerForm>();
  const { handleSubmit } = form;
  const queryClient = useQueryClient();

  const { data: ownersResponse } = useQuery({
    queryKey: ["autocompleteOwners"],
    queryFn: () => {
      return getOwnersAutocomplete();
    },
  });

  const { mutate: updateInformation, isLoading: isUpdateInformationLoading } =
    useMutation({
      mutationFn: (data: AdoptUpdateRequest) => {
        return updateAdopt(adoptId || "", data);
      },
      onSuccess: () => {
        successToast(strings.ADOPT_UPDATE_SUCCESSFULLY);
        queryClient.invalidateQueries(["adoptDetails", adoptId]);
        handleClose();
      },
    });

  const onSubmit = (data: AddDesignerForm) => {
    const payload: AdoptUpdateRequest = {
      designerIds: designersIds.concat(autocompleteValue(data.designerId)),
    };
    updateInformation(payload);
  };

  function filterAutocompleteResponse(ownerResponse?: OwnerInfo[]) {
    if (isDefined(ownerResponse)) {
      return formatOwnerInfoForDropdown(
        ownerResponse.filter((owner) => !designersIds.includes(owner.id))
      );
    }
    return [];
  }

  const bladeContent = (
    <FormProvider {...form}>
      <Container>
        <AutocompleteComponent
          name="designerId"
          label={strings.DESIGNER}
          options={filterAutocompleteResponse(ownersResponse)}
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
        content={strings.ADD}
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

export default AddDesignerBlade;
