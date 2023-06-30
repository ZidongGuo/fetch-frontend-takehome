import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';;

interface SortByProps {
  onSortByChange: (SortBy: string | null) => void;
}

export default function SortByFilter({ onSortByChange }: SortByProps) {
  const [SortBy, setSortBy] = React.useState<string | null>(null);


  React.useEffect(() => {
    if (SortBy) {
      onSortByChange(SortBy);
    }
  }, [SortBy, onSortByChange]);

  return (
    <div>
      <Autocomplete
        disablePortal
        value={SortBy}
        onChange={(event: any, newValue: string | null) => {
            setSortBy(newValue);
        }}
        options={['breed', 'age', 'name']}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Sort By" />}
      />
    </div>
  );
}
