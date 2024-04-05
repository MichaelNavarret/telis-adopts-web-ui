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
  handleChange?: (e: any) => void;
  disabled?: boolean;
  required?: boolean;
  value?: AutocompleteOption;
};

const AutocompleteComponent = (props: AutocompleteComponentProps) => {
  const {
    label,
    freeSolo = false,
    options = [],
    handleChange,
    disabled = false,
    required = false,
    value,
  } = props;

  return (
    <div style={{ width: "100%", marginTop: "1.5rem" }}>
      <Autocomplete
        id={label}
        freeSolo={freeSolo}
        options={options}
        disabled={disabled}
        value={value}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        onChange={(_e, value) => {
          if (isDefined(value)) {
            handleChange && handleChange(value);
          } else {
            handleChange && handleChange({ label: "", value: "" });
          }
        }}
        style={{ width: "100%", borderRadius: "10px" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            InputProps={{
              style: { borderRadius: "10px" },
              ...params.InputProps,
            }}
          />
        )}
        renderOption={(props, option) => (
          <AutocompleteLi {...props} option={option.label} />
        )}
      />
    </div>
  );
};

export default AutocompleteComponent;
