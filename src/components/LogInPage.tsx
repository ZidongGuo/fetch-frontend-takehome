import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInPage.css';
import { login, get_dogbreeds, get_dogsinfo, post_dogs } from '../utils/api';
import {QueryParameters} from '../utils/interface'
import axios, { AxiosResponse } from 'axios';

const LogInPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log('Username:', username);
    //console.log('Email:', email);
    login(username, email)
    .then((res) => {
      if (res && res.status === 200) {
        navigate('/home');
      }
      else{
        console.log('Log in failed, try again');
        navigate('/')
      }
    })
    // const emptyQueryParameters: QueryParameters = {
    //   breeds: ['Golden Retriever'],
    //   zipCodes: null,
    //   ageMin: null,
    //   ageMax: null,
    //   size: undefined,
    //   from: undefined,
    //   sort: undefined,
    // };
    // get_dogsinfo(emptyQueryParameters);
    // post_dogs(['VnGFTIcBOvEgQ5OCx7Iu','WHGFTIcBOvEgQ5OCx7Iu'])


  };

  return (
    <div className="LogInPage">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Find your next furry friend</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LogInPage;
