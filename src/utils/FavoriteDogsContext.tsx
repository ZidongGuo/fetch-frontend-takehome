import React from 'react';

interface FavoriteDogsContextType {
  FavoriteDogs: string[];
  setFavoriteDogs: React.Dispatch<React.SetStateAction<string[]>>;
}


const FavoriteDogsContext = React.createContext<FavoriteDogsContextType>({
  FavoriteDogs: [],
  setFavoriteDogs: () => {}, 
});

export default FavoriteDogsContext;