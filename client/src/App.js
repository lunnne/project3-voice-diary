import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Calendar from './components/calendar/Calendar';
import AddRecording from './components/recording/AddRecording';
import Home from './components/Home';



function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mydiary" element={<Calendar />} />
          <Route path="/mydiary/create" element={<AddRecording />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
