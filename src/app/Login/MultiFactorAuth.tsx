import { useState } from "react";
import { VerifyOtpRequest } from "../../types/login";
import { Typography } from "@mui/material";
import OtpInput from "react18-input-otp";
import Button from "../../components/Button";
import styles from "./MultiFactorAuth.module.scss";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import useUserSession from "../../hooks/useUserSession";
import { useMutation } from "react-query";
import { verifyOtp } from "../../api/login";
import Toast from "../../components/Toast";
import { DEFAULT_PATH } from "../../routes";
import { CustomizedSnackbarProps } from "../../types/commons";

type MultiFactorAuthProps = {
  formValue: { email: string; password: string };
  handleStep: (value: number) => void;
};

const MultiFactorAuth = (props: MultiFactorAuthProps) => {
  const { formValue, handleStep } = props;
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { _setLoginToken } = useUserSession();

  const { mutate: verifyOtpMutation, isLoading: isVerifyOtpLoading } =
    useMutation({
      mutationFn: (data: VerifyOtpRequest) => {
        return verifyOtp(data);
      },
      onSuccess: (data) => {
        _setLoginToken(data.token);
        localStorage.removeItem("telisWeb_firstToken");
        localStorage.setItem("loginSuccess", "yes");
        navigate(DEFAULT_PATH);
      },
    });

  const handleOtpVerify = () => {
    const payload: VerifyOtpRequest = {
      username: formValue.email,
      password: formValue.password,
      otpCode: otp,
    };
    verifyOtpMutation(payload);
  };

  return (
    <div className={styles.multifactorContainer}>
      <img
        src="src/assets/logos/lannies.png"
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.formContainer}>
        <Typography
          className={styles.multiFactorSubtitle}
          variant="body2"
          align="center"
        >
          A one-time code has been emailed to you. Check your inbox.
        </Typography>

        <div className={styles.otpContainer}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={styles.otpStyles}
            separator={<AutoAwesomeIcon className={styles.sparksIcon} />}
          />
        </div>

        <div className={styles.footerMultiFactorContainer}>
          <Typography
            className={styles.footerMultiFactorField}
            variant="body2"
            align="center"
          >
            Resend code
          </Typography>
          <Typography
            className={styles.footerMultiFactorField}
            variant="body2"
            align="center"
            onClick={() => handleStep(0)}
          >
            Back to Login
          </Typography>
        </div>
      </div>

      <Button
        disabled={otp?.length < 6 || isVerifyOtpLoading}
        loading={isVerifyOtpLoading}
        onClick={handleOtpVerify}
      >
        Login
      </Button>
    </div>
  );
};

export default MultiFactorAuth;
