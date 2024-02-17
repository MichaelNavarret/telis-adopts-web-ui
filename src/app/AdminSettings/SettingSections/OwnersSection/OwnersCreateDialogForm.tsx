import { FormEvent, useState } from "react";
import DialogComponent from "../../../../components/surfaces/DialogComponent";
import strings from "../../../../l10n";
import TextFieldComponent from "../../../../components/Form/TextFieldComponent";
import { OwnerCreateRequest } from "../../../../types/owner";
import styles from "./OwnersCreateDialogForm.module.scss";
import { Button } from "../../../../components";
import { useTheme } from "../../../../context/ThemeProvider";
import { FaCircleInfo } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { createOwner } from "../../../../api/owners";
import { successToast } from "../../../../constants/toasts";

type OwnersCreateDialogFormProps = {
  open: boolean;
  handleClose: () => void;
};

const OwnersCreateDialogForm = (props: OwnersCreateDialogFormProps) => {
  const { open, handleClose } = props;
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [payload, setPayload] = useState<OwnerCreateRequest>({
    nickName: "",
    email: "",
  });

  const { mutate: createOwnerMutation, isLoading: isCreateOwnerLoading } =
    useMutation({
      mutationFn: () => {
        return createOwner(payload);
      },
      onSuccess: () => {
        successToast(strings.OWNER_CREATED_SUCCESSFULLY);
        setPayload({ nickName: "", email: "" });
        queryClient.invalidateQueries("owners");
        handleClose();
      },
    });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    createOwnerMutation();
  };

  const dialogContent = (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className={styles.mainContainer}>
        <TextFieldComponent
          label={strings.NICKNAME}
          id="nickname"
          type="text"
          required
          value={payload.nickName}
          onChange={(e) => setPayload({ ...payload, nickName: e.target.value })}
        />
        <TextFieldComponent
          label={strings.EMAIL}
          id="email"
          type="email"
          required
          value={payload.email}
          onChange={(e) => setPayload({ ...payload, email: e.target.value })}
        />
        <div
          className={styles.infoContainer}
          style={{ border: "2px dashed " + colors.CTX_BUTTON_COLOR }}
        >
          <FaCircleInfo fontSize={"21px"} />
          <p className={styles.infoMessage}>{strings.OWNER_PASSWORD_MESSAGE}</p>
        </div>
        <Button
          type="submit"
          content={strings.CREATE}
          width="150px"
          height="35px"
          colorButton={colors.CTX_FORM_BUTTON_COLOR}
          buttonColorShadow={colors.CTX_BUTTON_SHADOW_COLOR_2}
          disabled={isCreateOwnerLoading}
          loading={isCreateOwnerLoading}
          catsLoading={isCreateOwnerLoading}
        />
      </div>
    </form>
  );

  return (
    <DialogComponent
      open={open}
      handleClose={handleClose}
      dialogTitle={strings.CREATE_OWNER_FORM}
      content={dialogContent}
    />
  );
};

export default OwnersCreateDialogForm;
