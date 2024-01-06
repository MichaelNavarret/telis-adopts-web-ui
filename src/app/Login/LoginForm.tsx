import { TextField } from "@mui/material";
import styles from "./LoginForm.module.scss";
import { FormEvent, useState } from "react";
import Button from "../../components/surfaces/Button";
// import useUserSession from "../../hooks/useUserSession";
// import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { LoginRequest } from "../../types/login";
import { login } from "../../api/login";
import { saveFirstToken } from "../../context/UserSession/userSessionReducer";
import TextComponent from "../../components/TextComponents/TextComponent";

type LoginFormProps = {
  handleStep: (val: number) => void;
  handleFormValue: (data: { email: string; password: string }) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { handleStep, handleFormValue } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ! this will be implemented with the skip2fa
  // const { _setLoginToken } = useUserSession();
  // const navigate = useNavigate();

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
          <TextComponent
            content={"Forgot Password?"}
            onClick={() => !isLoginLoading && handleStep(1)}
          />
        </div>
        <Button
          disabled={isLoginLoading && !isError}
          loading={isLoginLoading && !isError}
          marginTop="50px"
        >
          <p>Login</p>
        </Button>
      </form>
    </div>
  );
};
