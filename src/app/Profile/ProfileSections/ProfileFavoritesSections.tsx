import { useQuery } from "react-query";
import { OwnerInfo } from "../../../types/owner";
import { getFavoriteAdopts } from "../../../api/adopts";
import MasterListExpositorAdopts, {
  useMasterListExpositor,
} from "../../MasterList/components/MasterListExpositorAdopts";

type ProfileFavoritesSectionsProps = {
  owner?: OwnerInfo;
};

export const ProfileFavoritesSections = (
  props: ProfileFavoritesSectionsProps
) => {
  const { owner } = props;
  const { state } = useMasterListExpositor();

  const { data: favoriteAdoptsResponse, isLoading: isFavoriteAdoptsLoading } =
    useQuery({
      queryKey: ["favoriteAdopts", owner?.id, state.currentPage],
      queryFn: () => {
        return getFavoriteAdopts(owner?.id || "", state.currentPage);
      },
      enabled: !!owner?.id,
    });

  const totalPages =
    favoriteAdoptsResponse?.headers["x-pagination-total-pages"];

  return (
    <div>
      <MasterListExpositorAdopts
        adopts={favoriteAdoptsResponse?.data || []}
        isLoading={isFavoriteAdoptsLoading}
        onProfile
        totalPages={totalPages}
        state={state}
      />
    </div>
  );
};
