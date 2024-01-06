import { Tooltip } from "@mui/material";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./Bubble.module.scss";

type BubbleProps = {
  tooltipText?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  tooltipColor?: string;
  tooltipTextColor?: string;
  tooltipBackgroundColor?: string;
  icon: React.ReactNode;
  handleClick?: () => void;
  bottom?: string;
  right?: string;
  left?: string;
  top?: string;
  bubbleColor?: string;
  bubbleShadowColor?: string;
};

const Bubble = (props: BubbleProps) => {
  const { colors } = useTheme();
  const {
    tooltipText,
    tooltipPlacement = "top",
    tooltipTextColor = colors.CTX_BUBBLE_ICON_COLOR,
    tooltipBackgroundColor = colors.CTX_BUBBLE_COLOR,
    icon,
    handleClick,
    top,
    bottom,
    left,
    right,
    bubbleColor = colors.CTX_BUBBLE_HOME_COLOR,
    bubbleShadowColor = colors.CTX_BUTTON_SHADOW_COLOR,
  } = props;

  return (
    <Tooltip
      title={tooltipText}
      arrow
      placement={tooltipPlacement}
      componentsProps={{
        tooltip: {
          style: {
            fontSize: "1rem",
            backgroundColor: tooltipBackgroundColor,
            color: tooltipTextColor,
          },
        },
        arrow: {
          style: {
            color: tooltipBackgroundColor,
          },
        },
      }}
    >
      <div
        className={styles.homeBubbleContainer}
        style={{
          backgroundColor: bubbleColor,
          boxShadow: `0 0 10px ${bubbleShadowColor}`,
          top: top,
          bottom: bottom,
          left: left,
          right: right,
        }}
        onClick={handleClick}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

export default Bubble;
