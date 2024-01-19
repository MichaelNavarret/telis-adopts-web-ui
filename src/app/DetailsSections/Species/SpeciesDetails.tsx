type SpeciesDetailsProps = {
  specieId: string;
};

const SpeciesDetails = (props: SpeciesDetailsProps) => {
  const { specieId } = props;
  return <div>SpecieDetails: {specieId}</div>;
};

export default SpeciesDetails;
