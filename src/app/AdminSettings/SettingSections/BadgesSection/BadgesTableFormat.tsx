import strings from "../../../../l10n";
import { isDefined } from "../../../../tools/commons";
import { BadgeInfo } from "../../../../types/badge";

export const formattedBadgesRow = (data?: BadgeInfo[]) => {
  return data?.map((badge) => {
    return {
      badgeUrl: getBadgeImage(badge.badgeUrl),
      name: badge.name,
      code: badge.code,
      createdOn: badge.createdOn !== null ? badge.createdOn : "-",
      active: badge.active ? strings.ACTIVE : strings.INACTIVE,
    };
  });
};

const getBadgeImage = (badgeUrl: string) => {
  return (
    isDefined(badgeUrl) && (
      <img
        src={badgeUrl}
        alt="badge_image"
        width={30}
        style={{ alignSelf: "center" }}
      />
    )
  );
};
