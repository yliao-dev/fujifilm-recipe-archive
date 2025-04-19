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
  required?: boolean;
}

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}: SelectFieldProps) => {
  const labelId = `${name}-label`;

  return (
    <FormControl
      fullWidth
      required={required}
      variant="outlined"
      className="custom__selectField"
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
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
};

export default SelectField;
