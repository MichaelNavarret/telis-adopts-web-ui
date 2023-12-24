import { TextField, Typography } from "@mui/material";
import styles from "./LoginForm.module.scss";
import { FormEvent, useState } from "react";
import Button from "../../components/Button";

type LoginFormProps = {
  handleStep: (val: number) => void;
  handleFormValue: (data: { email: string; password: string }) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { handleStep, handleFormValue } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    handleStep(4);
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
          />
          <TextField
            id="passwordLoginForm"
            label="Password"
            type="password"
            className={styles.textField}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className={styles.forgotPasswordContainer}
            onClick={() => handleStep(1)}
          >
            Forgot Password?
          </div>
        </div>
        <Button>
          <p>Login</p>
        </Button>
      </form>
    </div>
  );
};
