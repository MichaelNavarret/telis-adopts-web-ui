import { Autocomplete, TextField } from "@mui/material";
import AutocompleteLi from "../Form/AutocompleteLi";
import { Controller, useFormContext } from "react-hook-form";

export type AutocompleteOption = {
  label: string;
  value: string;
};

type AutocompleteComponentProps = {
  label: string;
  freeSolo?: boolean;
  options?: AutocompleteOption[];
  disabled?: boolean;
  required?: boolean;
  initialValue?: AutocompleteOption;
  name: string;
};

type AutocompleteOptions = {
  label: string;
  value: string;
};

export function autocompleteValue(
  val: string | AutocompleteOptions | null | undefined
): string {
  val = val ?? "";
  if (typeof val !== "string") {
    return val.value;
  }
  return val;
}

const AutocompleteComponent = (props: AutocompleteComponentProps) => {
  const {
    label,
    freeSolo = false,
    options = [],
    disabled = false,
    required = false,
    name,
    initialValue,
  } = props;

  const { control } = useFormContext();
  const isRequired = required ? "Field is required" : undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequired,
        validate: {},
      }}
      defaultValue={initialValue}
      render={({ field: { onChange, value } }) => {
        return (
          <div style={{ width: "100%", marginTop: "1.5rem" }}>
            <Autocomplete
              id={label}
              freeSolo={freeSolo}
              options={options}
              disabled={disabled}
              value={value}
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
              style={{ width: "100%", borderRadius: "10px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  required={required}
                  onChange={onChange}
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
      }}
    />
  );
};

export default AutocompleteComponent;
