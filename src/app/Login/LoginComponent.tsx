import { useState } from "react";
import { LoginForm } from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import MultiFactorAuth from "./MultiFactorAuth";
import styles from "./LoginComponent.module.scss";
import { MAIN_LOGO } from "../../constants/logos";
import FormContainer from "./components/FormContainer";
import { DEFAULT_PRIMARY } from "../../constants/colors/mainColors";

type LoginComponentProps = {
  currentStep: number;
};

export const LoginComponent = (props: LoginComponentProps) => {
  const { currentStep } = props;
  const [step, setStep] = useState(currentStep || 0);
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const FormComponent = (props: { step: number }) => {
    const { step } = props;
    switch (step) {
      case 0:
        return (
          <LoginForm
            handleStep={(val) => setStep(val)}
            handleFormValue={(form) => setFormValue(form)}
          />
        );
      case 1:
        return <ForgotPasswordForm handleStep={(val) => setStep(val)} />;
      case 2:
        return <ResetPasswordForm handleStep={(val) => setStep(val)} />;
      default:
        return (
          <MultiFactorAuth
            formValue={formValue}
            handleStep={(val) => setStep(val)}
          />
        );
    }
  };

  return (
    <>
      <div className={styles.loginComponentContainer}>
        <img src={MAIN_LOGO} alt="logo" className={styles.logo} />
        <FormContainer backGroundColor={DEFAULT_PRIMARY}>
          <FormComponent step={step} />
        </FormContainer>
      </div>
    </>
  );
};

export default LoginComponent;
