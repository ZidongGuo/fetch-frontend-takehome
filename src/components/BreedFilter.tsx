import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { login, get_dogbreeds, get_dogsinfo } from '../utils/api';

interface BreedFilterProps {
  onBreedChange: (breed: string | null) => void;
}

export default function BreedFilter({ onBreedChange }: BreedFilterProps) {
  const [dogbreedList, setDogbreedList] = React.useState<string[] | null>(null);
  const [breed, setBreed] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchDogBreeds() {
      try {
        const breeds = await get_dogbreeds();
        setDogbreedList(breeds);
      } catch (error) {
        console.log("fetchDogBreeds() failed")
      }
    }

    fetchDogBreeds();
  }, []);

  React.useEffect(() => {
    if (breed) {
      // Pass the selected breed to the parent component
      onBreedChange(breed);
    }
  }, [breed, onBreedChange]);

  return (
    <div>
      <Autocomplete
        disablePortal
        value={breed}
        onChange={(event: any, newValue: string | null) => {
          setBreed(newValue);
        }}
        options={dogbreedList || []}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select your favorite dog breed" />}
      />
    </div>
  );
}
