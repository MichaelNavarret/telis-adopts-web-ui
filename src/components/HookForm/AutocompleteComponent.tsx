import { Autocomplete, TextField } from "@mui/material";
import { isDefined } from "../../tools/commons";
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
  initialValue?: string;
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
      render={({ field: { onChange } }) => {
        return (
          <div style={{ width: "100%", marginTop: "1.5rem" }}>
            <Autocomplete
              id={label}
              freeSolo={freeSolo}
              options={options}
              disabled={disabled}
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              isOptionEqualToValue={(option, value) => {
                return isDefined(option) && isDefined(value)
                  ? option.value === value.value
                  : false;
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
