import React, { useState } from 'react';
import BreedFilter from './BreedFilter';
import SortFilter from './SortFilter';
import SortByFilter from './SortByFilter';
import {Box, Grid, Button} from '@mui/material'


interface FilterPanelProps {
  onApplyFilters: (filters: { breed: string | null; sortby: string | null; sort: string | null }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {

    const [sortMethod, setSortMethod] = useState<string | null>('asc');
    const [breed, setBreed] = useState<string | null>(null);
    const [sortby, setSortBy]  = useState<string | null>(null);
    
    const handleSortMethodChange = (sortMethod: string | null) => {
      if (!sortMethod){
        setSortMethod('asc');
      }  
      else{
        setSortMethod(sortMethod);
      }
    };
    const handleBreedChange = (breed: string | null) => {
      setBreed(breed);
    };
    const handleSortByChange = (sortby: string | null) => {
      setSortBy(sortby);
    };

    const applyFilters =() =>{
      onApplyFilters({ breed: breed , sortby: sortby, sort: sortMethod  });
    }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item xs="auto">
            <BreedFilter onBreedChange={handleBreedChange}/>
          </Grid>
          <Grid item xs="auto">
            <SortByFilter onSortByChange={handleSortByChange}/>
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