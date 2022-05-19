import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(username, email, password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/");
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
    <div>
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
        <Link to={'/auth/login'}>Already have an account?</Link>
    </div>
  );
};

export default Signup;
