import { useQuery } from "react-query";
import { getAdopts } from "../../../api/adopts";
import MasterListExpositorAdopts from "../../MasterList/components/MasterListExpositorAdopts";

type ProfileCharactersSectionProps = {
  ownerId: string;
};

const ProfileCharactersSection = (props: ProfileCharactersSectionProps) => {
  const { ownerId } = props;

  const { data: ownerAdopts, isLoading } = useQuery({
    queryKey: ["ownerCharacters", ownerId],
    queryFn: () => {
      return getAdopts({ ownerId: ownerId, sort: "code:ASC" });
    },
    enabled: !!ownerId,
  });

  return (
    <div>
      <MasterListExpositorAdopts
        adopts={ownerAdopts?.data || []}
        isLoading={isLoading}
        onProfile
      />
    </div>
  );
};

export default ProfileCharactersSection;
