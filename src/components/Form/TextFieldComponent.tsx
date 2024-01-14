import { TextField } from "@mui/material";

type TexFieldComponentProps = {
  className?: string;
  id: string;
  label: string;
  type: "text" | "password" | "number" | "date" | "email" | "file";
  onChange: (e: any) => void;
  disabled?: boolean;
  required?: boolean;
  value?: string | number | null;
  style?: React.CSSProperties;
  helperText?: string;
  error?: boolean;
};

const TextFieldComponent = (props: TexFieldComponentProps) => {
  const {
    className,
    id,
    label,
    type,
    onChange,
    disabled,
    required = false,
    value,
    style,
    helperText,
    error,
  } = props;

  return (
    <TextField
      className={className}
      id={id}
      value={value}
      style={style}
      label={label}
      type={type}
      onChange={onChange}
      disabled={disabled}
      required={required}
      helperText={helperText}
      error={error}
      InputProps={{
        style: { borderRadius: "10px" },
      }}
    />
  );
};

export default TextFieldComponent;
