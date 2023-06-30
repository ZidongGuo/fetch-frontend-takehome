import React, { useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import DogInfoCard from './DogInfoCard';
import {QueryParameters, PageInfo} from '../utils/interface';
import {Box, Grid, Pagination, Stack, Button, Typography } from '@mui/material';
import {get_dogsinfo,get_moredogsinfo, post_dogs, matchDog } from '../utils/api';
import {Dog} from '../utils/interface';
import Headerbar from './Headerbar'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FavoriteDogsContext from '../utils/FavoriteDogsContext';


const Match: React.FC=()=>{
    const location = useLocation();
    const { username } = location.state || { username: '' };
    const {MatchedDogID} = location.state || { MatchedDogID: ''};
    const [MatchedDog, setMatchedDog] = useState<Dog>();
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate('/Home')
    }

    useEffect(() => {
        document.body.style.backgroundColor = 'lightgoldenrodyellow';
        return () => {
          document.body.style.backgroundColor = '';
        };
       
    }, []);
    
    useEffect(() => {
        post_dogs([MatchedDogID]).then((res2) => {
            console.log("MatchedDog is", res2)
            if (res2){
                setMatchedDog(res2[0]) 
            }
         
        });
    }, [MatchedDogID])


    if (!MatchedDog) {
        return null; // Render nothing if dogInfo is undefined
    }
    return(
        <div>
            <Headerbar userName={username}/>
            <Typography variant="h5" align="center">
                Voilà! Here is your matched friend based on your favorites
            </Typography>
            <Typography variant="body1" align="center">
                You can generate new match by changing favorites
            </Typography>
            <br/>
            <br/>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid>
                    <Grid item xs="auto" >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                title={MatchedDog.name}
                            />
                            <CardMedia
                                component="img"
                                //objectFit: "contain"
                                sx={{ height: 270, width: 310, objectFit: "cover" }}
                                image={MatchedDog.img}
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                Breed:{MatchedDog.breed}
                                <br/>
                                Age:{MatchedDog.age}
                                <br/>
                                Zipcode:{MatchedDog.zip_code}
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Grid>
            <Box>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs="auto">
                        <Button variant="contained" onClick= {goBack}  sx={{ width: 100, height: 50, padding: 1, margin: 2 }}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
                
            </Box>
        </div>
    )

}

export default Match;