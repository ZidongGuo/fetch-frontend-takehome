import React, { useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import DogInfoCard from './DogInfoCard';
import {QueryParameters, PageInfo} from '../utils/interface';
import {Box, Grid, Pagination, Stack, Button, Typography } from '@mui/material';
import {get_dogsinfo,get_moredogsinfo, post_dogs, matchDog } from '../utils/api';
import {Dog} from '../utils/interface';
import './Home.css';
import Headerbar from './Headerbar'
import FavoriteDogsContext from '../utils/FavoriteDogsContext';


const Home: React.FC = () => {
    const location = useLocation();
    const { username } = location.state || { username: '' }; // Retrieve the username from login Page
    const [Dogs, setDogs] = useState<Dog[]>([]);
    const [PrevPageURL, setPrevPageURL] =useState<string|null>();
    const [NextPageURL, setNextPageURL] =useState<string|null>();
    const [prevButton, setprevButton] =useState<boolean>(true);
    const [nextButton, setnextButton] =useState<boolean>(true);


    const context = useContext(FavoriteDogsContext);
    
    if (!context) {
      throw new Error("Expected context to be defined");
    }
  
    const { FavoriteDogs, setFavoriteDogs } = context;
    const navigate = useNavigate();

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
    // const updateQuery = (partialQuery: Partial<QueryParameters>) => {
    //   setQuery((prevQuery) => ({
    //     ...prevQuery,
    //     ...partialQuery,
    //     ...(Object.keys(partialQuery).reduce((acc, key) => {
    //       if (partialQuery[key as keyof QueryParameters] === null) {
    //         acc[key as keyof QueryParameters] = null;
    //       }
    //       return acc;
    //     }, {} as Partial<QueryParameters>)),
    //   }));
    // };

    const handleApplyFilters = (filters: { breed: string | null; sort: string | null }) => {
      if (filters.breed){
        updateQuery({
          breeds: [filters.breed]
        })
      }
      else{
        updateQuery({
          breeds: null
        })
      }
      if (filters.sort){
        updateQuery({
          sort: filters.sort
        })
      }
      else{
        updateQuery({
          sort: 'breed:asc'
        })
      }


      console.log('Selected Breed:', filters.breed);
      console.log('Selected Sort:', filters.sort);
      
    };

    // set the new URL for prev and next and set the corresponding button flags
    const prevnextState=(prev:string|null, next:string|null) =>{
      if (next){
        setnextButton(true)
        setNextPageURL(next)
      }
      else{
        setnextButton(false)
        setNextPageURL(null)
      }
      if (prev){
        setprevButton(true)
        setPrevPageURL(prev)
      }
      else{
        setprevButton(false)
        setPrevPageURL(null)
      }
    }

    useEffect(() => {
      
      const generate_initialpage=()=>{
        get_dogsinfo(Query).then((res) => {
          console.log('res.resultIds: ', res.resultIds)
          if (res && res.resultIds){
            post_dogs(res.resultIds).then((res2) => {
              setDogs(res2 || []);
            });
            prevnextState(res.prev, res.next);
          }
        }); 
      }
      
      generate_initialpage();  
    }, [Query]); 

    const generate_newdogs=(url:string)=>{
      get_moredogsinfo(url).then((res) => {
        console.log('res.resultIds: ', res.resultIds)
        if (res && res.resultIds){
          post_dogs(res.resultIds).then((res2) => {
            setDogs(res2 || []);
          });
          prevnextState(res.prev, res.next);
        }
      })
    }
    
    const prevDogsDisplay=()=>{
      if (PrevPageURL){
        generate_newdogs(PrevPageURL)
      }
      
    }

    const nextDogsDisplay=()=>{
      if (NextPageURL){
        generate_newdogs(NextPageURL)
      }
      
    }

    const toggleFavorite = (dogId: string) => {
      setFavoriteDogs((prevFavoriteDogs) => {
        if (prevFavoriteDogs.includes(dogId)) {
          // remove from favorites
          return prevFavoriteDogs.filter(id => id !== dogId);
        } else {
          // add to favorites
          return [...prevFavoriteDogs, dogId];
        }
      });
    };

    const displayMatch=()=>{
      console.log(FavoriteDogs)
      matchDog(FavoriteDogs).then((matchres) => {
        if (matchres){
          console.log("matchres：", matchres.match)
          navigate('/YourMatch', { state: { username, MatchedDogID:matchres.match } })

        }
        else{
          console.log("failed to find your match based on your favorites")
        }
      })
    }


  return (
    <div className='Home'>
      <Headerbar userName={username}/>
      <FilterPanel onApplyFilters={handleApplyFilters}/>
      <br/>
      <Box>
        
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs="auto">
            <Button variant="contained" disabled={FavoriteDogs.length===0} onClick= {displayMatch}  sx={{ width: 100, height: 50, padding: 1, margin: 2 }}>
              Match
            </Button>
          </Grid>
          <Grid item xs="auto" sx={{ width: 100, height: 50, padding: 1, margin: 4 }}>
            <Typography variant='subtitle2'>
              Generate your perfect match based on your favorites
            </Typography>
          </Grid>
        </Grid>
        
      </Box>
      <br/>
      <Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {
            Dogs.map(d =>(
              <Grid item xs="auto" key={d.id}>
                <DogInfoCard dogInfo={d} toggleFavorite={toggleFavorite} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
      <br/>
      <Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs="auto">
            <Button variant="contained" disabled={!prevButton} onClick= {prevDogsDisplay}  sx={{ width: 100, height: 50, padding: 1, margin: 2 }}>
              Previous
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button variant="contained" disabled={!nextButton} onClick= {nextDogsDisplay} sx={{ width: 100, height: 50, padding: 1, margin: 2 }}>
              Next
            </Button>
          </Grid>  
        </Grid>
      </Box>   
      
    </div>
  );
};

export default Home;