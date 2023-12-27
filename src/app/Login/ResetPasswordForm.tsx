import { TextField } from "@mui/material";
import Button from "../../components/Button";
import styles from "./ResetPasswordForm.module.scss";
import { FormEvent, useEffect, useState } from "react";
import PasswordValidator from "../../components/utils/PasswordValidator";
import { useSearchParams } from "react-router-dom";
import { loadToken } from "../../context/UserSession/userSessionReducer";
import { ChangePasswordRequest } from "../../types/login";
import { TypoGraph } from "../../components";

type ResetPasswordFormProps = {
  handleStep: (val: number) => void;
};

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { handleStep } = props;
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>();
  const [error2, setError2] = useState<string>();
  const [searchParams] = useSearchParams();
  const { password, confirmPassword } = formValues;
  const resetToken: string | null = searchParams.get("token");

  useEffect(() => {
    if (loadToken()) {
      localStorage.clear();
      window.location.reload();
    }
  }, [resetToken]);

  const handleFormChange = (e: React.ChangeEvent<any>, name: string) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const handlePassValidation = (bool: boolean) => {
    if (bool) {
      setError2("");
    } else {
      setError2("Password does not meet the requirements!");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    if (error2) return;
    if (
      formValues.password === formValues.confirmPassword &&
      resetToken &&
      !error2
    ) {
      const payload: ChangePasswordRequest = {
        token: resetToken,
        newPassword: formValues.password,
      };
    } else {
      setError2("Passwords do not match!");
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <img
        src="src/assets/logos/lannies.png"
        alt="logo"
        className={styles.logo}
      />
      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <PasswordValidator
            password={formValues.password}
            isValid={handlePassValidation}
          >
            <TextField
              id="newPasswordResetPasswordForm"
              label="Password"
              type="password"
              className={styles.textField}
              required
              error={Boolean(error2)}
              onChange={(e) => handleFormChange(e, "password")}
            />
          </PasswordValidator>
          {Boolean(error2) && (
            <TypoGraph variant="body2" color="error" content={error2} />
          )}
          <TextField
            id="confirmNewPasswordResetPasswordForm"
            label="ConfirmPassword"
            type="password"
            className={styles.textField}
            required
            helperText={error}
            error={Boolean(error)}
            onChange={(e) => handleFormChange(e, "confirmPassword")}
          />
        </div>
        <Button
          disabled={password === "" || confirmPassword === ""}
          height="80px"
          width="350px"
        >
          <p>Reset Password</p>
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
