import { useEffect, useState } from "react";
import { BadgeInfo } from "../../../../types/badge";
import { badges } from "../../../../constants/badges";
import { isDefined } from "../../../../tools/commons";

type BadgesExpositorProps = {
  adoptsBadge: BadgeInfo[];
};

const BadgesExpositor = (props: BadgesExpositorProps) => {
  const { adoptsBadge } = props;
  const [badgesArray, setBadgesArray] = useState<string[]>([]);

  useEffect(() => {
    let arrayOfBadges: string[] = [];
    if (isDefined(adoptsBadge)) {
      adoptsBadge.forEach((adoptBadge) => {
        switch (adoptBadge.code) {
          case "halloween":
            arrayOfBadges.push(badges.halloween);
            break;
          case "christmas":
            arrayOfBadges.push(badges.christmas);
            break;
          case "valentines-day":
            arrayOfBadges.push(badges.valentinesDay);
            break;
          case "chinese-new-year":
            arrayOfBadges.push(badges.chineseNewYear);
            break;
          case "sanrio":
            arrayOfBadges.push(badges.sanrio);
            break;
          default:
            break;
        }
        setBadgesArray(arrayOfBadges);
      });
    }
  }, [adoptsBadge]);

  return (
    <>
      {badgesArray.map((badge, index) => (
        <img key={index} src={badge} alt="badge" className="badge" width={40} />
      ))}
    </>
  );
};

export default BadgesExpositor;
