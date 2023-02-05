import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
      <Link to="/register">
        <button type="button">Register</button>
      </Link>
    </div>
  );
};

export default Home;
