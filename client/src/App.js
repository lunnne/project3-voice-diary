import './App.css';
import React , {useEffect, useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Calendar from './components/calendar/Calendar';
import AddRecording from './components/recording/AddRecording';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import AuthService from "./services/auth.service";

function App() {
  
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined)


  useEffect(() => {
    const user = AuthService.me();

    if (user) {
      setCurrentUser(user);
    } else {
      console.log('no user');
    }
  }, []);

  const logOut = () => {
    AuthService.logout()
    navigate('/')
  };

  

  return (
    <div className="App">
      <Navbar currentUser={currentUser} logOut={logOut}/>
      
      
      <div>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser}/>} />
          <Route path="/mydiary" element={<Calendar />} />
          <Route path="/mydiary/create" element={<AddRecording />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
