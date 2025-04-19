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
  minWidth?: number;
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
  minWidth = 160,
}: SelectFieldProps) => (
  <FormControl required={required} sx={{ minWidth }} size="small">
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      displayEmpty={displayEmpty}
    >
      {displayEmpty && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
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
