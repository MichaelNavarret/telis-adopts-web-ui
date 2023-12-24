import { useState } from "react";
import { LoginForm } from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import MultiFactorAuth from "./MultiFactorAuth";

type LoginComponentProps = {
  currentSetp: number;
};

export const LoginComponent = (props: LoginComponentProps) => {
  const { currentSetp } = props;
  const [step, setStep] = useState(currentSetp || 0);
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
        return <MultiFactorAuth formValue={formValue} />;
    }
  };

  return <FormComponent step={step} />;
};

export default LoginComponent;
