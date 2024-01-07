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
};

const AutocompleteComponent = (props: AutocompleteComponentProps) => {
  const { label, freeSolo = false, options = [], handleChange } = props;

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        id={label}
        freeSolo={freeSolo}
        options={options}
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
        renderInput={(params) => <TextField {...params} label={label} />}
        renderOption={(props, option) => (
          <AutocompleteLi {...props} option={option.label} />
        )}
      />
    </div>
  );
};

export default AutocompleteComponent;
