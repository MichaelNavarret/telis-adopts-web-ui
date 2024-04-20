import { useTheme } from "../../../../../context/ThemeProvider";
import styles from "./BadgesExpositor.module.scss";

type BadgesExpositorProps = {
  img: string;
  selected: boolean;
  badgeCode: string;
  id: string;
  handleClick: (value: string) => void;
};

export const BadgeExpositorItem = (props: BadgesExpositorProps) => {
  const { img, selected, badgeCode, id, handleClick } = props;
  const { colors } = useTheme();

  return (
    <div
      className={styles.badgesExpositor_badgeContainer}
      style={{
        border: selected
          ? "2px solid " + colors.primary_color
          : "2px solid transparent",
      }}
      key={id}
      onClick={() => handleClick(id)}
    >
      <img src={img} alt={badgeCode} width={"50px"} />
    </div>
  );
};
