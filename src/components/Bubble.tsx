import { Tooltip } from "@mui/material";
import styles from "./SocialNetworkMenu.module.scss";

type BubbleProps = {
  colorIcon?: string;
  colorBubble?: string;
  link?: string;
  children: React.ReactNode;
  tooltip?: boolean;
  tooltipText?: string;
};

export const Bubble = (props: BubbleProps) => {
  const {
    colorIcon = "#fef1df",
    colorBubble = "#FA688D",
    link = "#",
    children,
    tooltip,
    tooltipText,
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
        style={{ backgroundColor: colorBubble }}
      >
        <a href={link}>{children}</a>
      </div>
    </Tooltip>
  );
};

export default Bubble;
