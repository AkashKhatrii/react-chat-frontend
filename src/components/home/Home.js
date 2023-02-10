import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div>
      <Link to="/login">
        <button type="button" className="py-2 px-4 text-white bg-gray-700 rounded-md m-2 hover:bg-gray-600">Login</button>
      </Link>
      <Link to="/register">
        <button type="button" className="py-2 px-4 text-white bg-gray-700 rounded-md m-2 hover:bg-gray-600">Register</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
