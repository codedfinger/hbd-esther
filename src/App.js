import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CelebrationScreen from './components/CelebrationScreen';
import BulbScreen from './components/BulbScreen';
import GalleryScreen from './components/Gallery';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CelebrationScreen />} />
        <Route path="/bulbs" element={<BulbScreen />} />
        <Route path="/gallery" element={<GalleryScreen />} />

      </Routes>
    </Router>
  );
};

export default App;
