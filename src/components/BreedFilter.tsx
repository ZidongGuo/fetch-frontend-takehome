import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { login, get_dogbreeds, get_dogsinfo } from '../utils/api';




export default function BreedFilter() {
  const [dogbreedList, setDogbreedList] = React.useState<string[]>([]);
  const [breed, setBreed] = React.useState<string | null>();
  React.useEffect(() => {
    async function fetchDogBreeds() {
      try {
        const breeds = await get_dogbreeds();
        setDogbreedList(breeds);
      } catch (error) {
        // Handle error
      }
    }

    fetchDogBreeds();
  }, []);

  return (
    <div>
        <Autocomplete
            disablePortal
            value={breed}
            onChange={(event: any, newValue: string | null) => {
            setBreed(newValue);
            }}
            //id="combo-box-demo"
            options={dogbreedList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select your favorite dog breed" />}
        />
    </div>
  );
}
const breed ='golden'
export {breed}