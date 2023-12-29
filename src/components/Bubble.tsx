import styles from "./SocialNetworkMenu.module.scss";

type BubbleProps = {
  colorIcon: string;
  colorBubble: string;
  link?: string;
  children: React.ReactNode;
  shadowColor: string;
};

export const Bubble = (props: BubbleProps) => {
  const { colorBubble, link = "#", children, shadowColor } = props;
  return (
    <div
      className={styles.svgContainer}
      style={{
        backgroundColor: colorBubble,
        boxShadow: `0 0 10px ${shadowColor}`,
      }}
    >
      <a href={link} target="_blank">
        {children}
      </a>
    </div>
  );
};

export default Bubble;
