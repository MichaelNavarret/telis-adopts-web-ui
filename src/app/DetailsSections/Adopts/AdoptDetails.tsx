type AdoptDetailsProps = {
  adoptId: string;
};

export const AdoptDetails = (props: AdoptDetailsProps) => {
  const { adoptId } = props;

  return <div>{adoptId}</div>;
};
