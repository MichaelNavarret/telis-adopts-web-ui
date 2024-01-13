import { useQuery } from "react-query";
import MasterListHeader from "./components/MasterListHeader";
import { getSpecie } from "../../api/species";
import { useState } from "react";
import MasterListFilterButtons from "./components/MasterListFilterButtons";

const MasterListScreen = () => {
  const [creationTypeFilter, setCreationTypeFilter] = useState("PREMADE");

  const { data: specieInfo } = useQuery({
    queryKey: ["specieInfo"],
    queryFn: () => {
      return getSpecie(localStorage.getItem("specieId") || "");
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
    </div>
  );
};

export default MasterListScreen;
