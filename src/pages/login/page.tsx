import LoginComponent from "../../app/Login/LoginComponent";

type LoginPageProps = {
  currentSetp: number;
};

export const LoginPage = (props: LoginPageProps) => {
  const { currentSetp } = props;
  return <LoginComponent currentSetp={currentSetp} />;
};
