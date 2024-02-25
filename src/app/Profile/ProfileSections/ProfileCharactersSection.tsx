import { useQuery } from "react-query";
import { getAdopts } from "../../../api/adopts";
import MasterListExpositorAdopts, {
  useMasterListExpositor,
} from "../../MasterList/components/MasterListExpositorAdopts";

type ProfileCharactersSectionProps = {
  ownerId: string;
};

const ProfileCharactersSection = (props: ProfileCharactersSectionProps) => {
  const { ownerId } = props;
  const { state } = useMasterListExpositor();

  const { data: ownerAdopts, isLoading } = useQuery({
    queryKey: ["ownerCharacters", ownerId, state.currentPage],
    queryFn: () => {
      return getAdopts(
        { ownerId: ownerId, sort: "code:ASC" },
        state.currentPage
      );
    },
    enabled: !!ownerId,
  });

  const totalPages = ownerAdopts?.headers["x-pagination-total-pages"];

  return (
    <div>
      <MasterListExpositorAdopts
        adopts={ownerAdopts?.data || []}
        isLoading={isLoading}
        onProfile
        totalPages={totalPages}
        state={state}
      />
    </div>
  );
};

export default ProfileCharactersSection;
