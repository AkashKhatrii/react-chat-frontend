import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const { currentUser } = useContext(AuthContext)
  return (
    <div className="flex justify-between items-center bg-gray-700  p-3 text-white">
      <h3>Chat App</h3>

      <div className="flex items-center">
        <img
          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
          alt="profile"
          className="w-7 h-7 rounded-full mr-2 "
        ></img>
        <span className="mr-2">{currentUser.firstName}</span>
        <button type="button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
