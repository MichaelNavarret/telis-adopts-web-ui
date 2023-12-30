import { TextField } from "@mui/material";
import Button from "../../components/Button";
import styles from "./ResetPasswordForm.module.scss";
import { FormEvent, useEffect, useState } from "react";
import PasswordValidator from "../../components/utils/PasswordValidator";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loadToken } from "../../context/UserSession/userSessionReducer";
import { ChangePasswordRequest } from "../../types/login";
import { useMutation } from "react-query";
import { updatePasswordByLink } from "../../api/login";
import { CustomizedSnackbarProps } from "../../types/commons";

type ResetPasswordFormProps = {
  handleStep: (val: number) => void;
  handleSnackBar: (props: CustomizedSnackbarProps) => void;
};

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { handleStep, handleSnackBar } = props;
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>();
  const [error2, setError2] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { password, confirmPassword } = formValues;
  const resetToken: string | null = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (loadToken()) {
      localStorage.clear();
      window.location.reload();
    }
  }, [resetToken]);

  const { mutate: passwordUpdateMutation, isLoading: isPasswordUpdateLoading } =
    useMutation({
      mutationFn: (payload: ChangePasswordRequest) => {
        return updatePasswordByLink(payload);
      },
      onSuccess: () => {
        handleStep(0);
        handleSnackBar({
          type: "success",
          subTitle: "Password updated successfully!",
        });
        navigate("/login");
      },
    });

  const handleFormChange = (e: React.ChangeEvent<any>, name: string) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setError2("Password does not meet the requirements!");
      return;
    }
    if (
      formValues.password === formValues.confirmPassword &&
      resetToken &&
      !error2
    ) {
      const payload: ChangePasswordRequest = {
        token: resetToken,
        newPassword: formValues.password,
      };
      passwordUpdateMutation(payload);
    } else {
      setError("Passwords do not match!");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <PasswordValidator
          password={formValues.password}
          isValid={(val) => setIsValid(val)}
        >
          <TextField
            id="newPasswordResetPasswordForm"
            label="Password"
            type="password"
            className={styles.textField}
            required
            error={!isValid}
            onChange={(e) => handleFormChange(e, "password")}
          />
        </PasswordValidator>
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
        disabled={
          password === "" || confirmPassword === "" || isPasswordUpdateLoading
        }
        height="80px"
        width="350px"
        marginTop="50px"
      >
        <p>Reset Password</p>
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
