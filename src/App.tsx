import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage';
import userEvent from '@testing-library/user-event';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LogInPage/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
