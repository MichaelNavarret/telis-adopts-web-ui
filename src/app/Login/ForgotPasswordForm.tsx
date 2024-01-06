import { TextField } from "@mui/material";
import styles from "./ForgotPasswordForm.module.scss";
import { useState } from "react";
import Button from "../../components/surfaces/Button";
import { useMutation } from "react-query";
import { OwnerRequest } from "../../types/owner";
import { resetPasswordLink } from "../../api/login";
import { CustomizedSnackbarProps } from "../../types/commons";
import TextComponent from "../../components/TextComponents/TextComponent";

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
        <TextComponent
          content={"Back to Login"}
          onClick={() => handleStep(0)}
        />
      </div>
      <Button
        height="90px"
        marginTop="50px"
        disabled={resetPasswordLoading}
        loading={resetPasswordLoading}
      >
        <p>Recover Password</p>
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
