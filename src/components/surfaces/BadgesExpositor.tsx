import { useQuery } from "react-query";
import { getBadges } from "../../api/badges";
import { getBadgeImage } from "../../tools/badges";
import styles from "./BadgesExpositor.module.scss";
import { BadgeExpositorItem } from "../../app/AdminSettings/SettingSections/AdoptsSection/components/BadgeExpositorItem";
import TextComponent from "../TextComponents/TextComponent";
import strings from "../../l10n";

type BadgesExpositorProps = {
  selectedBadge?: string;
  setSelectedBadge: (badges: string) => void;
  title?: string;
  description?: string;
};

export const BadgesExpositor = (props: BadgesExpositorProps) => {
  const {
    selectedBadge,
    setSelectedBadge,
    title = strings.BADGE,
    description,
  } = props;

  const { data: badgesCollectionResponse } = useQuery({
    queryKey: ["badges"],
    queryFn: () => {
      return getBadges();
    },
  });

  const handleSelected = (value: string) => {
    if (value !== selectedBadge) {
      setSelectedBadge(value);
    } else {
      setSelectedBadge("");
    }
  };

  const isSelected = (id: string) => {
    return selectedBadge === id;
  };

  return (
    <div
      className={styles.badgesExpositor_mainContainer}
      style={{ marginBottom: "10px" }}
    >
      <TextComponent
        animation={false}
        content={title}
        hover={false}
        fontSize="large"
      />
      <TextComponent
        animation={false}
        content={description}
        hover={false}
        fontSize="x-small"
      />
      <div className={styles.badgesExpositor_badgesContainer}>
        {badgesCollectionResponse?.badgeInfoList.map((badge) => (
          <BadgeExpositorItem
            key={badge.id}
            img={getBadgeImage(badge.code)}
            selected={isSelected(badge.id)}
            badgeCode={badge.code}
            id={badge.id}
            handleClick={handleSelected}
          />
        ))}
      </div>
    </div>
  );
};
