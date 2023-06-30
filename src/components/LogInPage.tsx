import React, { useState, ChangeEvent, FormEvent, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInPage.css';
import { login, get_dogbreeds, get_dogsinfo, post_dogs } from '../utils/api';
import FavoriteDogsContext from '../utils/FavoriteDogsContext';

const LogInPage: React.FC = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const context = useContext(FavoriteDogsContext);
  
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    context.setFavoriteDogs([])
    event.preventDefault();
    //console.log('Username:', username);
    //console.log('Email:', email);
    login(username, email)
    .then((res) => {
      if (res && res.status === 200) {
        navigate('/home', { state: { username } });
      }
      else{
        console.log('Log in failed, try again');
        navigate('/')
      }
    })
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
