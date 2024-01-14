import { useQuery } from "react-query";
import MasterListHeader from "./components/MasterListHeader";
import { getSpecie } from "../../api/species";
import { useState } from "react";
import MasterListFilterButtons from "./components/MasterListFilterButtons";
import MasterListExpositorAdopts from "./components/MasterListExpositorAdopts";
import { getAdoptAutocomplete } from "../../api/adopts";
import { CreationType } from "../../types/adopt";

const MasterListScreen = () => {
  const [creationTypeFilter, setCreationTypeFilter] = useState("PREMADE");
  const specieId = localStorage.getItem("specieId") || "";

  const { data: specieInfo } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(localStorage.getItem("specieId") || "");
    },
  });

  const { data: adopts } = useQuery({
    queryKey: ["adopts", specieId, creationTypeFilter],
    queryFn: () => {
      return getAdoptAutocomplete({
        specieId: specieId,
        creationType: creationTypeFilter as CreationType,
      });
    },
  });

  const handleFilterClick = (filter: string) => {
    setCreationTypeFilter(filter);
  };

  return (
    <div style={{ width: "100%" }}>
      <MasterListHeader
        specieName={specieInfo?.name || ""}
        creationType={creationTypeFilter}
        masterListBannerUrl={specieInfo?.masterListBannerUrl || ""}
      />
      <MasterListFilterButtons handleClick={handleFilterClick} />
      {adopts && <MasterListExpositorAdopts adopts={adopts} />}
    </div>
  );
};

export default MasterListScreen;
