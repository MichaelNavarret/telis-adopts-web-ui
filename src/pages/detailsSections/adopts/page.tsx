import { useParams } from "react-router-dom";
import { AdoptDetails } from "../../../app/DetailsSections/Adopts/AdoptDetails";

export const AdoptDetailsPage = () => {
  const { adoptId } = useParams();

  if (!adoptId) {
    return <div>Invalid Adopt Id</div>;
  }

  return <AdoptDetails adoptId={adoptId} />;
};
