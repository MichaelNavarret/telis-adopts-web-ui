import { TextField } from "@mui/material";
import styles from "./ForgotPasswordForm.module.scss";
import { useState } from "react";
import Button from "../../components/Button";

type ResetPasswordFormProps = {
  handleStep: (val: number) => void;
};
export const ForgotPasswordForm = (props: ResetPasswordFormProps) => {
  const { handleStep } = props;

  const [email, setEmail] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(email);
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
        <Button height="90px">
          <p>Recover Password</p>
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
