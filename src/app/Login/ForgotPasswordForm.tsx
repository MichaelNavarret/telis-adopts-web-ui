import styles from "./ForgotPasswordForm.module.scss";
import { useState } from "react";
import Button from "../../components/surfaces/Button";
import { useMutation } from "react-query";
import { OwnerRequest } from "../../types/owner";
import { resetPasswordLink } from "../../api/login";
import TextComponent from "../../components/TextComponents/TextComponent";
import strings from "../../l10n";
import { successToast } from "../../constants/toasts";
import TextFieldComponent from "../../components/Form/TextFieldComponent";

type ResetPasswordFormProps = {
  handleStep: (val: number) => void;
};
export const ForgotPasswordForm = (props: ResetPasswordFormProps) => {
  const { handleStep } = props;
  const [email, setEmail] = useState("");

  const { mutate: resetPasswordLinkMutation, isLoading: resetPasswordLoading } =
    useMutation({
      mutationFn: (data: OwnerRequest) => {
        return resetPasswordLink(data);
      },
      onSuccess: () => {
        successToast(strings.CHECK_EMAIL_FOR_RESET_PASSWORD_LINK);
        handleStep(0);
      },
    });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const payload: OwnerRequest = {
      username: email,
    };
    resetPasswordLinkMutation(payload);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <TextFieldComponent
          id="emailAddressForgotForm"
          label={strings.EMAIL_ADDRESS}
          type="text"
          className={styles.textField}
          required
          onChange={(e) => setEmail(e.target.value)}
          disabled={resetPasswordLoading}
        />
        <TextComponent
          content={strings.BACK_TO_LOGIN}
          onClick={() => handleStep(0)}
        />
      </div>
      <Button
        height="90px"
        marginTop="50px"
        disabled={resetPasswordLoading}
        loading={resetPasswordLoading}
        catsLoading={resetPasswordLoading}
      >
        <p>{strings.RECOVER_PASSWORD}</p>
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
