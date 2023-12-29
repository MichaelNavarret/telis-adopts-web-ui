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
import { resentOtp, verifyOtp } from "../../api/login";
import { DEFAULT_PATH } from "../../routes";
import { OwnerRequest } from "../../types/owner";
import { CustomizedSnackbarProps } from "../../types/commons";
import TextComponent from "../../components/TextComponents/TextComponent";
import { MAIN_BUTTON_COLOR } from "../../constants/colors";

type MultiFactorAuthProps = {
  formValue: { email: string; password: string };
  handleStep: (value: number) => void;
  handleSnackBar: (props: CustomizedSnackbarProps) => void;
};

const MultiFactorAuth = (props: MultiFactorAuthProps) => {
  const { formValue, handleStep, handleSnackBar } = props;
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { _setLoginToken } = useUserSession();

  const { mutate: verifyOtpMutation, isLoading: isVerifyOtpLoading } =
    useMutation({
      mutationFn: (payload: VerifyOtpRequest) => {
        return verifyOtp(payload);
      },
      onSuccess: (data) => {
        _setLoginToken(data.token);
        localStorage.removeItem("telisWeb_firstToken");
        localStorage.setItem("loginSuccess", "yes");
        navigate(DEFAULT_PATH);
      },
    });

  const { mutate: resendOtpMutation, isLoading: isResendOtpLoading } =
    useMutation({
      mutationFn: (payload: OwnerRequest) => {
        return resentOtp(payload);
      },
      onSuccess: () => {
        handleSnackBar({
          type: "success",
          subTitle: "OTP resent successfully!",
        });
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

  const handleResendOtp = () => {
    if (!isResendOtpLoading) {
      const payload: OwnerRequest = {
        username: formValue.email,
      };
      resendOtpMutation(payload);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <TextComponent
          className={styles.multiFactorSubtitle}
          content={"A one-time code has been emailed to you. Check your inbox."}
          animation={false}
          hover={false}
          fontSize={"medium"}
        />

        <div className={styles.otpContainer}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={styles.otpStyles}
            separator={
              <AutoAwesomeIcon
                className={styles.sparksIcon}
                style={{ color: MAIN_BUTTON_COLOR }}
              />
            }
          />
        </div>

        <div className={styles.footerMultiFactorContainer}>
          <TextComponent
            className={
              isResendOtpLoading || isVerifyOtpLoading
                ? styles.footerMultiFactorFieldDisabled
                : styles.footerMultiFactorField
            }
            content={"Resend code"}
            onClick={handleResendOtp}
          />
          <TextComponent
            className={styles.footerMultiFactorField}
            content={"Back to Login"}
            onClick={() => handleStep(0)}
          />
        </div>
      </div>

      <Button
        disabled={otp?.length < 6 || isVerifyOtpLoading}
        loading={isVerifyOtpLoading}
        onClick={handleOtpVerify}
      >
        Login
      </Button>
    </>
  );
};

export default MultiFactorAuth;
