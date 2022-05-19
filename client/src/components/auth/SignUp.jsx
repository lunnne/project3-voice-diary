import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(username, email, password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate('/');
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup}>
        <h2>Sign up</h2>
        <div className="form-group">
          {/* <label>Username</label> */}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* <label>Email</label> */}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* <label>Password</label> */}
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Register
        </button>
        <p>
          <Link to={'/auth/login'}>Already have an account?</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
