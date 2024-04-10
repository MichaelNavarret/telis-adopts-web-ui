import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TexFieldComponentProps = {
  className?: string;
  id: string;
  label?: string;
  type?: "text" | "password" | "number" | "date" | "email" | "file";
  disabled?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  helperText?: string;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  initialValue?: string;
  name: string;
};

const TextFieldComponent = (props: TexFieldComponentProps) => {
  const {
    className,
    id,
    label,
    type = "text",
    disabled,
    required = false,
    style,
    helperText,
    error,
    multiline,
    rows,
    fullWidth,
    name,
    initialValue,
  } = props;
  const { control } = useFormContext();
  const isRequired = required ? "Field is required" : undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired, validate: {} }}
      defaultValue={initialValue}
      render={({ field: { onChange, value } }) => {
        return (
          <TextField
            className={className}
            id={id}
            spellCheck={false}
            value={value}
            style={style}
            label={label}
            type={type}
            onChange={onChange}
            disabled={disabled}
            required={required}
            helperText={helperText}
            error={error}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            InputProps={{
              style: { borderRadius: "10px" },
            }}
          />
        );
      }}
    />
  );
};

export default TextFieldComponent;
