import styles from "./SocialNetworkMenu.module.scss";

type NetworkBubbleProps = {
  colorIcon: string;
  colorBubble: string;
  link?: string;
  children: React.ReactNode;
  shadowColor: string;
};

export const NetworkBubble = (props: NetworkBubbleProps) => {
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

export default NetworkBubble;
