import React, { useState } from 'react';
import BreedFilter from './BreedFilter';
import SortFilter from './SortFilter';

// import Grid from '@mui/material/Unstable_Grid2';
import {Box, Grid, Button} from '@mui/material'


interface FilterPanelProps {
  onApplyFilters: (filters: { breed: string | null; sort: string | null }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {

    const [sortMethod, setSortMethod] = useState<string | null>('breed:asc');
    const [breed, setBreed] = useState<string | null>(null);

    const handleSortMethodChange = (sortMethod: string | null) => {
      if (!sortMethod){
        setSortMethod('breed:asc');
      }  
      else{
        setSortMethod('breed:'+sortMethod);
      }
    };
    const handleBreedChange = (breed: string | null) => {
        setBreed(breed);
    };

    const applyFilters =() =>{
      onApplyFilters({ breed: breed , sort: sortMethod  });
    }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item xs="auto">
            <BreedFilter onBreedChange={handleBreedChange}/>
          </Grid>
          <Grid item xs="auto">
            <SortFilter onSortMethodChange={handleSortMethodChange}/>
          </Grid>
          <Grid item xs="auto">
            <Button onClick={applyFilters}>Search</Button>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
};

export default FilterPanel;