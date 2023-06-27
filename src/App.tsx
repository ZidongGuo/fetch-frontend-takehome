import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage';
import userEvent from '@testing-library/user-event';
import FilterPanel from './components/FilterPanel';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LogInPage/>}/>
          <Route path="/home" element={<FilterPanel/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
