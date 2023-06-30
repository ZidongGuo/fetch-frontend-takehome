import React, { useState, useEffect, ChangeEvent} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage';
import userEvent from '@testing-library/user-event';
import Home from './components/Home';
import Match from './components/Match';
function App() {
  const [FavoriteDogs, setFavoriteDogs] = useState<string[]>([]);
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<LogInPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/yourmatch" element={<Match/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
