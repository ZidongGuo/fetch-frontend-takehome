import React, { useState, useEffect, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import DogInfoCard from './DogInfoCard';
import {QueryParameters, pageInfo} from '../utils/interface';
import {Box, Grid, Pagination, Stack } from '@mui/material';
import {get_dogsinfo, post_dogs } from '../utils/api';
import {Dog} from '../utils/interface';
import './Home.css';
import Headerbar from './Headerbar'
const Home: React.FC = () => {
    const [DogIDs, setDogIDs] = useState<string[]>([]);
    const [DogsCnt, setDogsCnt] = useState<number>();
    const [Dogs, setDogs] = useState<Dog[]>([]);
    const [Sort, setSort] = useState<string| null>('breed:asc');
    // const [PageCnt, setPageCnt] = useState<number>(1);
    // const [CurrPage, setCurrPage]= useState<number>()
    // const [pagination, setPagination] = useState<pageInfo>();
    const [Query, setQuery] = useState <QueryParameters>(
      {
        breeds: null,
        zipCodes: null,
        ageMin: null,
        ageMax: null,
        size: undefined,
        from: undefined,
        sort: 'breed:asc',
      }
    )
  
    const updateQuery = (partialQuery: Partial<QueryParameters>) => {
      setQuery((prevQuery) => ({
        ...prevQuery,
        ...partialQuery,
      }));
    };

    const handleApplyFilters = (filters: { breed: string; sort: string }) => {
      if (filters.breed){
        updateQuery({
          breeds: [filters.breed]
        })
      }
      if (filters.sort){
        updateQuery({
          sort: filters.sort
        })
      }


      console.log('Selected Breed:', filters.breed);
      console.log('Selected Sort:', filters.sort);
      
    };



    // const handlePageChange =(e:ChangeEvent<any>,p:number)=>{
    //   setCurrPage(p)
    //   console.log("current page is ", p)
    // }
    useEffect(() => {
  
      get_dogsinfo(Query).then((res) => {
        console.log('res.resultIds: ', res.resultIds)
        if (res && res.resultIds){
          setDogIDs(res.resultIds);
          setDogsCnt(res.total)
          post_dogs(res.resultIds).then((res2) => {
            setDogs(res2 || []);
          });
        }
        // setDogIDs(res.resultIds);
        // post_dogs(res.resultIds).then((res2) => {
        //   setDogs(res2 || []);
        // });
      });
      
    
    }, [Query]); 
 
    
    //console.log("DogIDs is",DogIDs )
  return (
    <div className='Home'>
      <Headerbar userName='John'/>
      <FilterPanel onApplyFilters={handleApplyFilters}/>
      <br/>
      <br/>
      <Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          
          {
            Dogs.map(d =>(
              <Grid item xs="auto">
                <DogInfoCard dogInfo={d} />
              </Grid>
            ))
          }
          
        </Grid>
      </Box>
      {/* <Stack justifyContent="center" alignItems="center" sx={{ padding: "20px" }}>
        <Pagination count={PageCnt} onChange={handlePageChange}/>
      </Stack>       */}

    </div>
  );
};

export default Home;
