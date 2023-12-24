import { forwardRef, useEffect, useMemo, useState } from "react";
import styles from "./PasswordValidator.module.scss";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tooltip } from "@mui/material";

const PasswordValidatorForwardRef = forwardRef((props: any, ref: any) => {
  return (
    <div {...props} ref={ref}>
      {props.children}
    </div>
  );
});

type PasswordValidatorProps = {
  password: string;
  isValid?: (valid: boolean) => void;
  children: React.ReactElement;
};

const PasswordValidator = (props: PasswordValidatorProps) => {
  const { password = "", children, isValid } = props;
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (isValid) {
      isValid(valid);
    }
  }, [valid, isValid]);

  const passwordChecklist = useMemo(() => {
    const passwordChecklist = {
      containsUL: { msg: "An uppercase letter (A-Z)", valid: false },
      containsLL: { msg: "A lowercase letter (a-z)", valid: false },
      containsSC: { msg: "A special character (!@#$)", valid: false },
      contains8C: { msg: "At least 8 characters", valid: false },
      containsN: { msg: "A number (0-9)", valid: false },
    };
    const { containsUL, containsLL, containsSC, contains8C, containsN } =
      passwordChecklist;

    // has uppercase letter
    if (password.toLowerCase() !== password) containsUL.valid = true;
    else containsUL.valid = false;

    // has lowercase letter
    if (password.toUpperCase() !== password) containsLL.valid = true;
    else containsLL.valid = false;

    // has number
    if (/\d/.test(password)) containsN.valid = true;
    else containsN.valid = false;

    // has special character
    if (/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password))
      containsSC.valid = true;
    else containsSC.valid = false;

    // has 8 characters
    if (password.length >= 8) contains8C.valid = true;
    else contains8C.valid = false;

    // all validations passed
    if (
      containsUL.valid &&
      containsLL.valid &&
      containsN.valid &&
      containsSC.valid &&
      contains8C.valid
    )
      setValid(true);
    else setValid(false);

    return passwordChecklist;
  }, [password]);

  const jsx = (
    <div className={styles.checklistContainer}>
      <div className={styles.headerStyle}>{"Password Must contain"}</div>
      {Object.values(passwordChecklist).map((pc) => (
        <div className={styles.textContainer} key={pc.msg}>
          {pc.valid ? (
            <DoneIcon htmlColor="#3AAA97" />
          ) : (
            <ErrorOutlineIcon color="secondary" />
          )}
          <span
            className={`${styles.ml2} ${
              pc.valid ? styles.valid : styles.notValid
            }`}
          >
            {pc.msg}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Tooltip
      className={styles.tooltipContainer}
      title={jsx}
      placement="right"
      componentsProps={{
        tooltip: {
          style: {
            backgroundColor: "#fef1df",
            color: "#F784A1",
            fontSize: "1rem",
            border: "1px solid #F784A1",
            borderRadius: "35px",
          },
        },
      }}
    >
      <PasswordValidatorForwardRef>{children}</PasswordValidatorForwardRef>
    </Tooltip>
  );
};

export default PasswordValidator;
