import { useEffect, useState } from "react";
import { badges } from "../../../../constants/badges";
import { isDefined } from "../../../../tools/commons";

type BadgesExpositorProps = {
  badgesCode: string[];
  badgeSize?: number;
};

const BadgesExpositor = (props: BadgesExpositorProps) => {
  const { badgesCode, badgeSize = 40 } = props;
  const [badgesArray, setBadgesArray] = useState<string[]>([]);

  useEffect(() => {
    let arrayOfBadges: string[] = [];
    if (isDefined(badgesCode)) {
      badgesCode.forEach((code) => {
        switch (code) {
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
  }, [badgesCode]);

  return (
    <>
      {badgesArray.map((badge, index) => (
        <img
          key={index}
          src={badge}
          alt="badge"
          className="badge"
          width={badgeSize}
        />
      ))}
    </>
  );
};

export default BadgesExpositor;
