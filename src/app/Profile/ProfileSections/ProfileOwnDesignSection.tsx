import { useQuery } from "react-query";
import { getDesignedAdopts } from "../../../api/adopts";
import MasterListExpositorAdopts, {
  useMasterListExpositor,
} from "../../MasterList/components/MasterListExpositorAdopts";

type ProfileOwnDesignSectionProps = {
  ownerId: string;
};

export const ProfileOwnDesignSection = (
  props: ProfileOwnDesignSectionProps
) => {
  const { ownerId } = props;
  const { state } = useMasterListExpositor();

  const { data: designedAdopts, isLoading } = useQuery({
    queryKey: ["ownerCharacters", ownerId],
    queryFn: () => {
      return getDesignedAdopts(ownerId);
    },
    enabled: !!ownerId,
  });

  const totalPages = designedAdopts?.headers["x-pagination-total-pages"];

  return (
    <div>
      <MasterListExpositorAdopts
        adopts={designedAdopts?.data || []}
        isLoading={isLoading}
        onProfile
        totalPages={totalPages}
        state={state}
      />
    </div>
  );
};
