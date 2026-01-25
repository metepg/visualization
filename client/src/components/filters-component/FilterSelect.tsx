import { FormControl, MenuItem, Select, Stack, SelectChangeEvent } from "@mui/material";

interface Props<T> {
  label: string;
  width: number;
  value: T | undefined;
  options: T[];
  getKey: (item: T) => string | number;
  getLabel: (item: T) => string;
  onChange: (item: T) => void;
  isOptionDisabled?: (item: T) => boolean;
}

// Component uses primitive values for MUI Select and maps them back to objects
const FilterSelect = <T,>({ label, width, value, options, getKey, getLabel, onChange, isOptionDisabled }: Props<T>) => {
  const currentKey = value ? getKey(value) : '';

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    const selectedKey = e.target.value;
    const selectedItem = options.find(option => getKey(option) === selectedKey);
    if (selectedItem) {
      onChange(selectedItem);
    }
  };

  return (
    <Stack sx={{ width: 1060 }} direction="column">
      <p style={{ textAlign: 'center', textTransform: 'uppercase' }}>{label}</p>
      <FormControl sx={{ width }}>
        <Select
          value={currentKey}
          onChange={handleChange}
          renderValue={() => value ? getLabel(value) : ''}
        >
          {options.map((option) => {
            const key = getKey(option);
            return (
              <MenuItem
                key={key}
                value={key}
                disabled={isOptionDisabled ? isOptionDisabled(option) : false}
              >
                {getLabel(option)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default FilterSelect;
