import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Dog} from '../utils/interface'


interface DogInfoCardProps {
  dogInfo: Dog;
  toggleFavorite: (dogId: string) => void;
  FavoriteDogs: string[];
}

export default function DogInfoCard({dogInfo, toggleFavorite, FavoriteDogs}:DogInfoCardProps){

    if (!dogInfo) {
      return null; // Render nothing if dogInfo is undefined
    }

    const isFavorite = FavoriteDogs.includes(dogInfo.id);

    const handleClick = () => {
      toggleFavorite(dogInfo.id);
    };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={dogInfo.name}
      />
      <CardMedia
        component="img"
        //objectFit: "contain"
        sx={{ height: 270, width: 310, objectFit: "cover" }}
        image={dogInfo.img}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          Breed:{dogInfo.breed}
          <br/>
          Age:{dogInfo.age}
          <br/>
          Zipcode:{dogInfo.zip_code}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleClick} color={isFavorite ? 'error': 'default'} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}