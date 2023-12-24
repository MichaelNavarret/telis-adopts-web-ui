import { Tooltip } from "@mui/material";
import styles from "./SocialNetworkMenu.module.scss";

type BubbleProps = {
  colorIcon?: string;
  colorBubble?: string;
  link?: string;
  children: React.ReactNode;
  tooltip?: boolean;
  tooltipText?: string;
  shadowColor?: string;
};

export const Bubble = (props: BubbleProps) => {
  const {
    colorIcon = "#fef1df",
    colorBubble = "#FA688D",
    link = "#",
    children,
    tooltip,
    tooltipText,
    shadowColor = "#8B457E",
  } = props;
  return (
    <Tooltip
      title={tooltip ? tooltipText : ""}
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          style: {
            backgroundColor: colorIcon,
            color: colorBubble,
            fontSize: "1rem",
          },
        },
        arrow: {
          style: {
            color: colorIcon,
          },
        },
      }}
    >
      <div
        className={styles.svgContainer}
        style={{
          backgroundColor: colorBubble,
          boxShadow: `0 0 10px ${shadowColor}`,
        }}
      >
        <a href={link}>{children}</a>
      </div>
    </Tooltip>
  );
};

export default Bubble;
