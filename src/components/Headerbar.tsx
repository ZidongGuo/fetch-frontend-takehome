import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {logout} from "../utils/api";
import { Button, Typography } from '@mui/material';
import './Headerbar.css';

interface HeaderbarProps {
  userName: string;
}

const Headerbar = ({ userName }: HeaderbarProps) => {
  const navigate = useNavigate();
  const handleLogout=()=>{
        logout().then(()=>{
          navigate('/')
        })
        
  }
  return (
    <Grid container spacing={2} justifyContent="right" alignItems="middle" >
      <Grid item xs='auto'>
        <h3>Welcome Back {userName} !</h3>
      </Grid>
      <Grid item xs='auto'>
        <Button  variant='outlined'  sx={{ width: 90, padding: 1, margin: 2 }} onClick={handleLogout}> logout</Button>
      </Grid>
    </Grid>
  );
};

export default Headerbar;
