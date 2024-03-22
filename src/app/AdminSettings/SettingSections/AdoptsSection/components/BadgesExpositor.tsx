import { useQuery } from "react-query";
import { getBadges } from "../../../../../api/badges";
import { getBadgeImage } from "../../../../../tools/badges";
import styles from "./BadgesExpositor.module.scss";
import { BadgeExpositorItem } from "./BadgeExpositorItem";
import TextComponent from "../../../../../components/TextComponents/TextComponent";

type BadgesExpositorProps = {
  selectedBadges: string[];
  setSelectedBadges: (badges: string[]) => void;
};

export const BadgesExpositor = (props: BadgesExpositorProps) => {
  const { selectedBadges, setSelectedBadges } = props;

  const { data: badgesCollectionResponse } = useQuery({
    queryKey: ["badges"],
    queryFn: () => {
      return getBadges();
    },
  });

  const handleSelected = (value: string) => {
    if (selectedBadges.includes(value)) {
      setSelectedBadges(selectedBadges.filter((id) => id !== value));
    } else {
      setSelectedBadges([...selectedBadges, value]);
    }
  };

  const isSelected = (id: string) => {
    return selectedBadges.includes(id);
  };

  return (
    <div
      className={styles.badgesExpositor_mainContainer}
      style={{ marginBottom: "10px" }}
    >
      <TextComponent
        animation={false}
        content="Badges"
        hover={false}
        fontSize="large"
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
