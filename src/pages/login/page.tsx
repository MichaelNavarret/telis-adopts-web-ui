import LoginComponent from "../../app/Login/LoginComponent";

type LoginPageProps = {
  currentStep: number;
};

export const LoginPage = (props: LoginPageProps) => {
  const { currentStep } = props;
  return <LoginComponent currentStep={currentStep} />;
};
