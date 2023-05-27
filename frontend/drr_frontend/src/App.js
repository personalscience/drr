// App.js
import React from 'react';
import './App.css';
import Input from './Input';
import Results from './Results';
import Navbar from './Navigation';
import Settings from './Settings';
import Home from './Home';
import Footer from './Footer'; // Import Footer

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/results" element={<Results />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </AppProvider>
        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
