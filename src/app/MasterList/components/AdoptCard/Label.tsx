type LabelProps = {
  label: string;
  color: string;
  backgroundColor: string;
};

const Label = (props: LabelProps) => {
  const { label, color, backgroundColor } = props;
  return (
    <p
      style={{
        color,
        backgroundColor,
        marginTop: "10px",
        padding: "3px",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "20px",
      }}
    >
      {label}
    </p>
  );
};

export default Label;
