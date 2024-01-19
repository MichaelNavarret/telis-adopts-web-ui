import { useParams } from "react-router-dom";
import SpeciesDetails from "../../../app/DetailsSections/Species/SpeciesDetails";

const SpeciesDetailsPage = () => {
  const { specieId } = useParams();

  if (!specieId) {
    return <div>Invalid Specie Id</div>;
  }

  return <SpeciesDetails specieId={specieId} />;
};

export default SpeciesDetailsPage;
