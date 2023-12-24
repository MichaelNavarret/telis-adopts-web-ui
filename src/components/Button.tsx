import styles from "./Button.module.scss";

type ButtonProps = {
  colorButton?: string;
  colorTextButton?: string;
  buttonColorShadow?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  const {
    colorButton = "#F784A1",
    colorTextButton = "#fef1df",
    buttonColorShadow = "#BB6D9B",
    children,
    type = "submit",
    width = "300px",
    height = "60px",
    disabled = false,
  } = props;
  return (
    <button
      className={styles.buttonStyles}
      style={{
        backgroundColor: colorButton,
        color: colorTextButton,
        width: width,
        height: height,
        boxShadow: `0 0 10px ${buttonColorShadow}`,
      }}
      type={type}
      disabled={disabled}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

export default Button;
