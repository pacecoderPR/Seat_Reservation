import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Updated imports
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes> {/* Changed from <Switch> to <Routes> */}
        <Route path="/" element={<Login />} /> {/* Changed from component={Home} to element={<Home />} */}
        <Route path="/login" element={<Login />} /> {/* Changed from component={Login} to element={<Login />} */}
        <Route path="/signup" element={<Signup />} /> {/* Changed from component={Signup} to element={<Signup />} */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

