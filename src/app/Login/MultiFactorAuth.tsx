import { useState } from "react";
import { VerifyOtpRequest } from "../../types/login";
import { Typography } from "@mui/material";
import OtpInput from "react18-input-otp";
import Button from "../../components/Button";
import styles from "./MultiFactorAuth.module.scss";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

type MultiFactorAuthProps = {
  formValue: { email: string; password: string };
};

const MultiFactorAuth = (props: MultiFactorAuthProps) => {
  const { formValue } = props;
  const [otp, setOtp] = useState("");

  const handleOtpVerify = () => {
    const payload: VerifyOtpRequest = {
      username: formValue.email,
      password: formValue.password,
      otpCode: otp,
    };
    console.log(payload);
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
      </div>

      <Button disabled={otp?.length < 6} onClick={handleOtpVerify}>
        Login
      </Button>
    </div>
  );
};

export default MultiFactorAuth;
