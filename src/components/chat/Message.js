import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message}) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div
      ref={ref}
      className={`flex ${
        message.senderId === currentUser._id && "flex-row-reverse"
      } gap-6 items-center mb-3 cursor-pointer`}
    >
      <div className="flex-col">
        <img
          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
          alt="person"
          className="w-7 h-7 rounded-full"
        ></img>
        <span className="text-gray-400">Just now</span>
      </div>
      <div>
        <p
          className={`p-2 rounded-md rounded-tl-none bg-gray-300 mb-2 w-max ${
            message.senderId === currentUser._id && "bg-gray-600 text-white"
          }`}
        >
          {message.text}
        </p>
        {/* <img
          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
          alt="person"
          className="w-2/4"
        ></img> */}
      </div>
    </div>
  );
};

export default Message;
