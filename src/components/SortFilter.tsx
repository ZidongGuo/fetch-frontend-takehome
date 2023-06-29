import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const sortOptions = ['asc', 'desc'];

interface SortFilterProps {
  onSortMethodChange: (sortMethod: string | null) => void;
}

export default function SortFilter({ onSortMethodChange }: SortFilterProps) {
  const [sortMethod, setSort] = React.useState<string | null>(null);

  React.useEffect(() => {
    onSortMethodChange(sortMethod);
  }, [sortMethod, onSortMethodChange]);

  return (
    <Autocomplete
      disablePortal
      value={sortMethod}
      onChange={(event: any, newValue: string | null) => {
        setSort(newValue);
      }}
      options={sortOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Sorting Order" />}
    />
  );
}