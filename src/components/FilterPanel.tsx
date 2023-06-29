import React, { useState } from 'react';
import BreedFilter from './BreedFilter';
import SortFilter from './SortFilter';
import DogInfoCard from './DogInfoCard'
// import Grid from '@mui/material/Unstable_Grid2';
import {Box, Grid} from '@mui/material'


interface FilterPanelProps {
  onApplyFilters: (filters: { breed: string; sort: string }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
//const FilterPanel: React.FC= () => {

    const [sortMethod, setSortMethod] = useState<string | null>('breed:asc');
    const [breed, setBreed] = useState<string | null>(null);

    const handleSortMethodChange = (sortMethod: string | null) => {
        setSortMethod('breed:'+sortMethod);
    };
    const handleBreedChange = (breed: string | null) => {
        setBreed(breed);
    };

    const applyFilters =() =>{
      onApplyFilters({ breed: breed || '', sort: sortMethod || '' });
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
            <button onClick={applyFilters}>Apply Filters</button>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
};

export default FilterPanel;