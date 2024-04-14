import { FormProvider, useForm } from "react-hook-form";
import { BadgeCreateRequest } from "../../../../types/badge";
import { Button, Container } from "../../../../components";
import TextFieldComponent from "../../../../components/HookForm/TextFieldComponent";
import strings from "../../../../l10n";
import { useState } from "react";
import styles from "./BadgeBlades.module.scss";
import Blade from "../../../../components/fc_components/Blade";
import { useMutation, useQueryClient } from "react-query";
import { createBadge, uploadBadgeImage } from "../../../../api/badges";
import { errorToast, successToast } from "../../../../constants/toasts";
import { isDefined } from "../../../../tools/commons";
import { BadgeDropzone } from "./BadgeImageUpdateDropzone";

type BadgeCreateBladeProps = {
  open: boolean;
  handleClose: () => void;
};

type CreateBadgeFieldsForm = {
  name: string;
  code: string;
  description: string;
};

export const BadgeCreateBlade = (props: BadgeCreateBladeProps) => {
  const { open, handleClose } = props;
  const [badgeImage, setBadgeImage] = useState<File | undefined>();
  const form = useForm<CreateBadgeFieldsForm>();
  const { handleSubmit } = form;
  const queryClient = useQueryClient();

  const { mutate: createBadgeMutation, isLoading: isCreateBadgeLoading } =
    useMutation({
      mutationFn: (data: BadgeCreateRequest) => {
        return createBadge(data);
      },
      onSuccess: (data) => {
        successToast(strings.BADGE_CREATED_SUCCESSFULLY);

        if (isDefined(badgeImage)) {
          uploadBadgeImageMutation(data.id);
        } else {
          finishCreateFlowActions();
        }
      },
    });

  const {
    mutate: uploadBadgeImageMutation,
    isLoading: isUploadBadgeImageLoading,
  } = useMutation({
    mutationFn: (badgeId: string) => {
      return uploadBadgeImage(badgeImage as File, badgeId);
    },
    onSuccess: () => {
      successToast(strings.BADGE_IMAGE_UPDATED_SUCCESSFULLY);
      finishCreateFlowActions();
    },
    onError: () => {
      errorToast(strings.BADGE_IMAGE_UPLOAD_FAILED);
      finishCreateFlowActions();
    },
  });

  function finishCreateFlowActions() {
    setBadgeImage(undefined);
    form.reset();
    queryClient.invalidateQueries(["badges"]);
    handleClose();
  }

  const onSubmit = (data: CreateBadgeFieldsForm) => {
    const payload: BadgeCreateRequest = {
      name: data.name,
      code: data.code,
      description: data.description,
    };
    createBadgeMutation(payload);
  };

  const isLoading = isCreateBadgeLoading || isUploadBadgeImageLoading;

  const bladeContent = (
    <FormProvider {...form}>
      <Container className={styles.createBadgeBladeFormContainer}>
        <div>
          <BadgeDropzone
            handleDrop={(files) => {
              setBadgeImage(files[0]);
            }}
            className={styles.badgeImageField}
            disabled={false}
          />
        </div>
        <TextFieldComponent
          id="name"
          name="name"
          type="text"
          label={strings.NAME}
          required
        />
        <TextFieldComponent
          id="code"
          name="code"
          type="text"
          label={strings.CODE}
          required
        />
        <TextFieldComponent
          id="description"
          name="description"
          type="text"
          label={strings.DESCRIPTION}
          multiline={true}
          rows={10}
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
        disabled={isLoading}
      />
      <Button
        content={strings.CREATE}
        onClick={handleSubmit(onSubmit)}
        withShadow={false}
        width="130px"
        height="30px"
        loading={isLoading}
        catsLoading={isLoading}
        disabled={isLoading}
      />
    </Container>
  );

  return (
    <Blade
      open={open}
      onClose={handleClose}
      title={`${strings.CREATE} ${strings.BADGE}`}
      bodyNode={bladeContent}
      footerNode={bladeFooter}
    />
  );
};
