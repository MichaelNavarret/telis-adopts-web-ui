import { useQuery } from "react-query";
import { getDesignedAdopts } from "../../../api/adopts";
import MasterListExpositorAdopts from "../../MasterList/components/MasterListExpositorAdopts";

type ProfileOwnDesignSectionProps = {
  ownerId: string;
};

export const ProfileOwnDesignSection = (
  props: ProfileOwnDesignSectionProps
) => {
  const { ownerId } = props;

  const { data: designedAdopts, isLoading } = useQuery({
    queryKey: ["ownerCharacters", ownerId],
    queryFn: () => {
      return getDesignedAdopts(ownerId);
    },
    enabled: !!ownerId,
  });

  return (
    <div>
      <MasterListExpositorAdopts
        adopts={designedAdopts?.data || []}
        isLoading={isLoading}
        onProfile
      />
    </div>
  );
};
