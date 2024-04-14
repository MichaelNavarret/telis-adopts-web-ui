import { FormProvider, useForm } from "react-hook-form";
import { BadgeInfo, BadgeUpdateRequest } from "../../../../types/badge";
import { Button, Container } from "../../../../components";
import strings from "../../../../l10n";
import styles from "./BadgeBlades.module.scss";
import Blade from "../../../../components/fc_components/Blade";
import TextFieldComponent from "../../../../components/HookForm/TextFieldComponent";
import DropdownComponent from "../../../../components/HookForm/DropdownComponent";
import { ACTIVE_STATUS_OPTIONS } from "../../../../constants/SelectOptions";
import { useEffect, useState } from "react";
import { isDefined } from "../../../../tools/commons";
import { useMutation, useQueryClient } from "react-query";
import { updateBadge, uploadBadgeImage } from "../../../../api/badges";
import { errorToast, successToast } from "../../../../constants/toasts";
import { BadgeDropzone } from "./BadgeImageUpdateDropzone";

type BadgeUpdateBladeProps = {
  open: boolean;
  handleClose: () => void;
  badge?: BadgeInfo;
};

type BladeUpdateFormFields = {
  name: string;
  code: string;
  description: string;
  active: string;
};

export const BadgeUpdateBlade = (props: BadgeUpdateBladeProps) => {
  const { open, handleClose, badge } = props;
  const [badgeImage, setBadgeImage] = useState<File | undefined>();
  const form = useForm<BladeUpdateFormFields>();
  const { handleSubmit } = form;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isDefined(badge)) {
      setFormValues(badge);
    }
  }, [badge]);

  const { mutate: updateBadgeMutation, isLoading: isUpdateBadgeLoading } =
    useMutation({
      mutationFn: (payload: BadgeUpdateRequest) => {
        return updateBadge(badge?.id || "", payload);
      },
      onSuccess: (data) => {
        successToast(strings.BADGE_UPDATED_SUCCESSFULLY);
        setFormValues(data);
        if (isDefined(badgeImage)) {
          uploadBadgeImageMutation(badge?.id || "");
        } else {
          finishUpdateFlowActions();
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
      finishUpdateFlowActions();
    },
    onError: () => {
      errorToast(strings.BADGE_IMAGE_UPLOAD_FAILED);
      finishUpdateFlowActions();
    },
  });

  function finishUpdateFlowActions() {
    setBadgeImage(undefined);
    queryClient.invalidateQueries(["badges"]);
    handleClose();
  }

  const onSubmit = (data: BladeUpdateFormFields) => {
    const payload: BadgeUpdateRequest = {
      name: data.name,
      code: data.code,
      description: data.description,
      active: data.active === "1" ? true : false,
    };
    updateBadgeMutation(payload);
  };

  const setFormValues = (badge: BadgeInfo) => {
    form.setValue("name", badge.name);
    form.setValue("code", badge.code);
    form.setValue("description", badge.description);
    form.setValue("active", badge.active ? "1" : "0");
  };

  const isLoading = isUpdateBadgeLoading || isUploadBadgeImageLoading;

  const bladeContent = (
    <FormProvider {...form}>
      <Container className={styles.editBadgeBladeFormContainer}>
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
        />
        <TextFieldComponent
          id="code"
          name="code"
          type="text"
          label={strings.CODE}
        />
        <TextFieldComponent
          id="description"
          name="description"
          type="text"
          label={strings.DESCRIPTION}
          multiline={true}
          rows={10}
        />
        <DropdownComponent
          label={strings.STATUS}
          options={ACTIVE_STATUS_OPTIONS}
          name="active"
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
        content={strings.UPDATE}
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
      title={strings.UPDATE + " " + strings.BADGE}
      bodyNode={bladeContent}
      footerNode={bladeFooter}
    />
  );
};
