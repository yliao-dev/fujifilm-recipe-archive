import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
  required,
  displayEmpty = true,
}: SelectFieldProps) => (
  <FormControl required={required} className="custom__selectField">
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      displayEmpty={displayEmpty}
      MenuProps={{
        PaperProps: {
          className: "custom__dropdown",
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
