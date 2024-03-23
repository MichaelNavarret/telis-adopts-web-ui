import { useEffect, useState } from "react";
import { badges } from "../../../../constants/badges";
import { isDefined } from "../../../../tools/commons";
import { Tooltip } from "@mui/material";

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

  const formatCodeBadge = (code: string) => {
    switch (code) {
      case "halloween":
        return "Halloween";
      case "christmas":
        return "Christmas";
      case "valentines-day":
        return "Valentine's Day";
      case "chinese-new-year":
        return "Chinese New Year";
      case "sanrio":
        return "Sanrio";
      default:
        return "";
    }
  };

  return (
    <>
      {badgesArray.map((badge, index) => (
        <Tooltip
          title={formatCodeBadge(badgesCode[index])}
          key={index}
          arrow
          placement="top-start"
        >
          <img
            key={index}
            src={badge}
            alt="badge"
            className="badge"
            width={badgeSize}
          />
        </Tooltip>
      ))}
    </>
  );
};

export default BadgesExpositor;
