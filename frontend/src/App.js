import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MatchPrediction from './components/MatchPrediction';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MatchPrediction />} />
        <Route
          path='*'
          element={
            <h1>
              Not Found visit <Link to={'/'}>visit</Link>
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
