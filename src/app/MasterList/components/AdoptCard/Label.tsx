type LabelProps = {
  label: string;
  color: string;
  backgroundColor: string;
  fontSize?: string;
};

const Label = (props: LabelProps) => {
  const { label, color, backgroundColor, fontSize } = props;
  return (
    <p
      style={{
        color,
        backgroundColor,
        marginTop: "10px",
        padding: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderRadius: "20px",
        fontSize: fontSize || "14px",
        letterSpacing: "0.2rem",
      }}
    >
      {label}
    </p>
  );
};

export default Label;
