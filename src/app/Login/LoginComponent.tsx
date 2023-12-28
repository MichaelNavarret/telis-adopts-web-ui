import { useState } from "react";
import { LoginForm } from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import MultiFactorAuth from "./MultiFactorAuth";
import CustomizedSnackbar from "../../components/CustomizeSnackBar";
import { CustomizedSnackbarProps } from "../../types/commons";

type LoginComponentProps = {
  currentStep: number;
};

export const LoginComponent = (props: LoginComponentProps) => {
  const { currentStep } = props;
  const [step, setStep] = useState(currentStep || 0);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [snackElements, setSnackElements] = useState<CustomizedSnackbarProps>();
  const [open, setOpen] = useState(false);

  const handleSnackBar = (props: CustomizedSnackbarProps) => {
    setSnackElements({
      type: props.type,
      subTitle: props.subTitle,
    });
    setOpen(true);
  };

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
        return (
          <ForgotPasswordForm
            handleStep={(val) => setStep(val)}
            handleSnackBar={handleSnackBar}
          />
        );
      case 2:
        return (
          <ResetPasswordForm
            handleStep={(val) => setStep(val)}
            handleSnackBar={handleSnackBar}
          />
        );
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
      <FormComponent step={step} />
      <CustomizedSnackbar
        type={snackElements?.type}
        subTitle={snackElements?.subTitle}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default LoginComponent;
