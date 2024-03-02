import { useQuery } from "react-query";
import MasterListHeader from "./components/MasterListHeader";
import { getSpecie } from "../../api/species";
import { useState } from "react";
import MasterListFilterButtons from "./components/MasterListFilterButtons";
import MasterListExpositorAdopts, {
  useMasterListExpositor,
} from "./components/MasterListExpositorAdopts";
import { CreationType } from "../../types/adopt";
import { getAdopts } from "../../api/adopts";

const MasterListScreen = () => {
  const [creationTypeFilter, setCreationTypeFilter] = useState("PREMADE");
  const specieId = localStorage.getItem("specieId") || "";
  const { state } = useMasterListExpositor();

  const { data: specieInfo, isLoading: isSpecieInfoLoading } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(localStorage.getItem("specieId") || "");
    },
  });

  const { data: adopts, isLoading: isAdoptsLoading } = useQuery({
    queryKey: [
      "adopts",
      specieId,
      creationTypeFilter,
      "code:ASC",
      state.currentPage,
    ],
    queryFn: () => {
      return getAdopts(
        {
          specieId: specieId,
          creationType: creationTypeFilter as CreationType,
          sort: "code:ASC",
        },
        state.currentPage
      );
    },
  });

  const handleFilterClick = (filter: string) => {
    setCreationTypeFilter(filter);
  };

  const isLoading = () => {
    return isSpecieInfoLoading || isAdoptsLoading;
  };

  const totalPages = adopts?.headers["x-pagination-total-pages"];

  const MainContent = () => {
    return (
      <div style={{ width: "100%" }}>
        <MasterListHeader
          specieName={specieInfo?.name || ""}
          creationType={creationTypeFilter}
          masterListBannerUrl={specieInfo?.masterListBannerUrl || ""}
        />
        <MasterListFilterButtons handleClick={handleFilterClick} />
        {adopts && (
          <MasterListExpositorAdopts
            adopts={adopts?.data}
            isLoading={isLoading()}
            totalPages={totalPages}
            state={state}
          />
        )}
      </div>
    );
  };

  return <MainContent />;
};

export default MasterListScreen;
