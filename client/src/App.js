import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Calendar from './components/calendar/Calendar';
import AddRecording from './components/recording/AddRecording';
import Home from './components/Home';
import Login from './components/auth/Login';
import { useAuth } from './context/AuthContext';



function App() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  
  const onLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout();
      navigate('/');
    }}

  return (
    <div className="App">
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mydiary" element={<Calendar />} />
          <Route path="/mydiary/create" element={<AddRecording />} />
          <Route path="/mydiary/signup" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
