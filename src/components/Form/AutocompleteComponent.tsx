import { Autocomplete, TextField } from "@mui/material";
import { isDefined } from "../../tools/commons";
import AutocompleteLi from "./AutocompleteLi";

export type AutocompleteOption = {
  label: string;
  value: string;
};

type AutocompleteComponentProps = {
  label: string;
  freeSolo?: boolean;
  options?: AutocompleteOption[];
  handleChange: (e: any) => void;
  disabled?: boolean;
  required?: boolean;
};

const AutocompleteComponent = (props: AutocompleteComponentProps) => {
  const {
    label,
    freeSolo = false,
    options = [],
    handleChange,
    disabled = false,
    required = false,
  } = props;

  return (
    <div style={{ width: "100%", marginTop: "10px" }}>
      <Autocomplete
        id={label}
        freeSolo={freeSolo}
        options={options}
        disabled={disabled}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        onChange={(_e, value) => {
          if (isDefined(value)) {
            handleChange(value);
          } else {
            handleChange({ label: "", value: "" });
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} required={required} />
        )}
        renderOption={(props, option) => (
          <AutocompleteLi {...props} option={option.label} />
        )}
      />
    </div>
  );
};

export default AutocompleteComponent;
