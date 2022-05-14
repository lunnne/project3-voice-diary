import React from 'react';
import hug from './hug.png';

const Home = () => {
  return (
    <div className="home">
      <h1 id="main-text">How are you today?</h1>
      <img src={hug} className="hug" alt="hug" />
      <button id="main-btn">Start</button>
    </div>
  );
};

export default Home;
