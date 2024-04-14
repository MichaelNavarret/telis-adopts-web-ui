import { Tooltip } from "@mui/material";
import { BadgeInfo } from "../../../../types/badge";

type BadgesExpositorProps = {
  badges: BadgeInfo[];
  badgeSize?: number;
};

const BadgesExpositor = (props: BadgesExpositorProps) => {
  const { badges, badgeSize = 40 } = props;
  console.log("Badges: ", badges);
  return (
    <>
      {badges.map((badge, index) => (
        <Tooltip
          title={badge.description}
          key={index}
          arrow
          placement="top-start"
        >
          <img
            key={index}
            src={badge.badgeUrl}
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
