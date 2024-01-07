import { InputLabel, MenuItem, Select } from "@mui/material";

export type DropdownComponentOption = {
  label: string;
  value: string | number;
};

type DropdownComponentProps = {
  name: string;
  label: string;
  value: string | number;
  handleChange: (e: any) => void;
  options: DropdownComponentOption[];
  required?: boolean;
};

const DropdownComponent = (props: DropdownComponentProps) => {
  const {
    name,
    value = "",
    handleChange,
    options = [],
    label,
    required = false,
  } = props;
  return (
    <div style={{ width: "100%" }}>
      <InputLabel id={`${label}Label`}>{name}</InputLabel>
      <Select
        labelId={`${label}Label`}
        style={{ width: "100%" }}
        label={label}
        value={value}
        onChange={(e) => handleChange(e)}
        required={required}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={option.value + "_" + index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default DropdownComponent;
