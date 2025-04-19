import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";

export interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent) => void;
  helperText?: string;
  required?: boolean;
  displayEmpty?: boolean;
}

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  helperText = "",
  required = false,
  displayEmpty = true,
}: SelectFieldProps) => (
  <FormControl required={required}>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      displayEmpty={displayEmpty}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default SelectField;
