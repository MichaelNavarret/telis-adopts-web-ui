import { useQuery } from "react-query";
import MasterListHeader from "./components/MasterListHeader";
import { getSpecie } from "../../api/species";
import { useState } from "react";
import MasterListFilterButtons from "./components/MasterListFilterButtons";
import MasterListExpositorAdopts from "./components/MasterListExpositorAdopts";
import { CreationType } from "../../types/adopt";
import { getAdopts } from "../../api/adopts";
import { Skeleton } from "@mui/material";

const MasterListScreen = () => {
  const [creationTypeFilter, setCreationTypeFilter] = useState("PREMADE");
  const specieId = localStorage.getItem("specieId") || "";

  const { data: specieInfo, isLoading: isSpecieInfoLoading } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(localStorage.getItem("specieId") || "");
    },
  });

  const { data: adopts, isLoading: isAdoptsLoading } = useQuery({
    queryKey: ["adopts", specieId, creationTypeFilter, "code:ASC"],
    queryFn: () => {
      return getAdopts({
        specieId: specieId,
        creationType: creationTypeFilter as CreationType,
        sort: "code:ASC",
      });
    },
  });

  const handleFilterClick = (filter: string) => {
    setCreationTypeFilter(filter);
  };

  const isLoading = () => {
    return isSpecieInfoLoading || isAdoptsLoading;
  };

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
          />
        )}
      </div>
    );
  };

  return <MainContent />;
};

export default MasterListScreen;
