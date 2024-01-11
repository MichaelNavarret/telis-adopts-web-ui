import styles from "./ActionIconComponent.module.scss";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useTheme } from "../../context/ThemeProvider";

type ActionIconComponentProps = {
  fontsize?: "small" | "inherit" | "medium" | "large";
  iconColor?: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  handleClick?: (value?: any) => void;
  disabled?: boolean;
  marginTop?: string;
};

const ActionIcon = (props: ActionIconComponentProps) => {
  const { colors } = useTheme();
  const {
    fontsize = "small",
    iconColor = colors.CTX_BUTTON_SHADOW_COLOR_2,
    Icon,
    handleClick,
    disabled = false,
    marginTop,
  } = props;
  return (
    <Icon
      style={{
        color: !disabled ? iconColor : "grey",
        cursor: !disabled ? "pointer" : "not-allowed",
        marginTop: marginTop,
      }}
      className={!disabled ? ` ${styles.actionIcon}` : ""}
      fontSize={fontsize}
      onClick={!disabled ? handleClick : undefined}
    />
  );
};

export default ActionIcon;
