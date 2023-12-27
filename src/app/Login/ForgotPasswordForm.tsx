import { TextField } from "@mui/material";
import styles from "./ForgotPasswordForm.module.scss";
import { useState } from "react";
import Button from "../../components/Button";
import { useMutation } from "react-query";
import { OwnerRequest } from "../../types/owner";
import { resetPasswordLink } from "../../api/login";
import { CustomizedSnackbarProps } from "../../types/commons";

type ResetPasswordFormProps = {
  handleStep: (val: number) => void;
  handleSnackBar: (props: CustomizedSnackbarProps) => void;
};
export const ForgotPasswordForm = (props: ResetPasswordFormProps) => {
  const { handleStep, handleSnackBar } = props;
  const [email, setEmail] = useState("");

  const { mutate: resetPasswordLinkMutation, isLoading: resetPasswordLoading } =
    useMutation({
      mutationFn: (data: OwnerRequest) => {
        return resetPasswordLink(data);
      },
      onSuccess: () => {
        handleSnackBar({
          type: "success",
          subTitle: "Check our email for the reset password link!",
        });
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
    <div className={styles.forgotPasswordContainer}>
      <img
        src="src/assets/logos/lannies.png"
        alt="logo"
        className={styles.logo}
      />
      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <TextField
            id="emailAddressForgotForm"
            label="Email Address"
            type="text"
            className={styles.textField}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className={styles.backToLoginContainer}
            onClick={() => handleStep(0)}
          >
            Back to Login
          </div>
        </div>
        <Button
          height="90px"
          disabled={resetPasswordLoading}
          loading={resetPasswordLoading}
        >
          <p>Recover Password</p>
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
