import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MatchPrediction from './components/MatchPrediction';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Hello</div>} />
        <Route path='/matches' element={<div>Matches</div>} />
        <Route path='/predictions' element={<MatchPrediction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
