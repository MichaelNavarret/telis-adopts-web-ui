import { TextField, Typography } from "@mui/material";
import styles from "./LoginForm.module.scss";
import { FormEvent, useState } from "react";
import Button from "../../components/Button";
import useUserSession from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { LoginRequest } from "../../types/login";
import { login } from "../../api/login";
import { saveFirstToken } from "../../context/UserSession/userSessionReducer";
import { CustomizedSnackbarProps, ErrorInfo } from "../../types/commons";

type LoginFormProps = {
  handleStep: (val: number) => void;
  handleFormValue: (data: { email: string; password: string }) => void;
  handleSnackBar: (props: CustomizedSnackbarProps) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { handleStep, handleFormValue, handleSnackBar } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { _setLoginToken } = useUserSession();
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isLoading: isLoginLoading,
    isError,
  } = useMutation({
    mutationFn: (data: LoginRequest) => {
      return login(data);
    },
    onSuccess: (data) => {
      saveFirstToken(data.token);
      handleFormValue({ email: email, password: password });
      handleStep(4);
    },
    onError: (error: ErrorInfo) => {
      handleSnackBar({
        type: "error",
        subTitle: error.response.data.message,
      });
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: LoginRequest = {
      username: email,
      password: password,
    };
    loginMutation(payload);
  };

  return (
    <div className={styles.loginContainer}>
      <img
        src="src/assets/logos/lannies.png"
        alt="logo"
        className={styles.logo}
      />
      <form onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <TextField
            id="emailAddressLoginForm"
            label="Email Address"
            type="text"
            className={styles.textField}
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginLoading}
          />
          <TextField
            id="passwordLoginForm"
            label="Password"
            type="password"
            className={styles.textField}
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoginLoading}
          />
          <div
            className={styles.forgotPasswordContainer}
            onClick={() => !isLoginLoading && handleStep(1)}
          >
            Forgot Password?
          </div>
        </div>
        <Button
          disabled={isLoginLoading && !isError}
          loading={isLoginLoading && !isError}
        >
          <p>Login</p>
        </Button>
      </form>
    </div>
  );
};
