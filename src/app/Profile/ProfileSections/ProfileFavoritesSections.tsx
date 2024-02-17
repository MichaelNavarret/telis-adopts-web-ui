import { useQuery } from "react-query";
import { OwnerInfo } from "../../../types/owner";
import { getFavoriteAdopts } from "../../../api/adopts";
import MasterListExpositorAdopts from "../../MasterList/components/MasterListExpositorAdopts";

type ProfileFavoritesSectionsProps = {
  owner?: OwnerInfo;
};

export const ProfileFavoritesSections = (
  props: ProfileFavoritesSectionsProps
) => {
  const { owner } = props;

  const { data: favoriteAdoptsResponse, isLoading: isFavoriteAdoptsLoading } =
    useQuery({
      queryKey: ["favoriteAdopts", owner?.id],
      queryFn: () => {
        return getFavoriteAdopts(owner?.id || "");
      },
      enabled: !!owner?.id,
    });

  return (
    <div>
      <MasterListExpositorAdopts
        adopts={favoriteAdoptsResponse?.data || []}
        isLoading={isFavoriteAdoptsLoading}
        onProfile
      />
    </div>
  );
};
