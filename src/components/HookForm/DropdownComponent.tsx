import { MenuItem, TextField } from "@mui/material";
import { useTheme } from "../../context/ThemeProvider";
import { Controller, useFormContext } from "react-hook-form";

export type DropdownComponentOption = {
  label: string;
  value: string | number;
};

type DropdownComponentProps = {
  label: string;
  options: DropdownComponentOption[];
  required?: boolean;
  disabled?: boolean;
  width?: string;
  initialValue?: string;
  name: string;
};

const DropdownComponent = (props: DropdownComponentProps) => {
  const {
    name,
    options = [],
    label,
    required = false,
    disabled = false,
    width = "100%",
    initialValue,
  } = props;
  const { colors } = useTheme();
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
          <div style={{ width: width }}>
            <TextField
              style={{ width: "100%", borderRadius: "10px" }}
              label={label}
              value={value}
              variant="outlined"
              onChange={onChange}
              required={required}
              disabled={disabled}
              select
              InputProps={{
                style: { borderRadius: "10px" },
              }}
            >
              {options.map((option, index) => {
                return (
                  <MenuItem
                    key={option.value + "_" + index}
                    value={option.value}
                    sx={{
                      //hover
                      "&:hover": {
                        backgroundColor: colors.CTX_TABLE_ROW_HOVER_COLOR,
                      },
                    }}
                  >
                    {option.label}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
        );
      }}
    />
  );
};

export default DropdownComponent;
