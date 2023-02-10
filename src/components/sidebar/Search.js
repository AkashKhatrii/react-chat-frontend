import React, { useContext, useState } from "react";
import axios from "axios";
import { db } from "../../firebase";
import { collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const Search = () => {

  const { currentUser } = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [friend, setFriend] = useState(null);
  const [err, setErr] = useState(false);

  console.log("search", currentUser)
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFriend(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {

    const combinedId = currentUser._id > friend.uid ? currentUser._id + friend.uid : friend.uid + currentUser._id
    try{
    const res = await getDoc(doc(db, "chats", combinedId))
    if(!res.exists()){
      await setDoc(doc(db, "chats", combinedId), {messages: []})

      await updateDoc(doc(db, "userChats", currentUser._id), {
        [combinedId+".userInfo"]: {
          uid: friend.uid,
          displayName: friend.displayName,
        },
        [combinedId+".date"]: serverTimestamp()
      })

      await updateDoc(doc(db, "userChats", friend.uid), {
        [combinedId+".userInfo"]: {
          uid: currentUser._id,
          displayName: currentUser.firstName,
        },
        [combinedId+".date"]: serverTimestamp()
      })

    }
    } catch(err){

    }

    setFriend(null)
    setUsername("")
  }
  return (
    <div className="flex-col">
      <input
        type="text"
        placeholder="Find user"
        className="outline-none p-2 w-full"
        onKeyDown={handleKey}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      { err && <h2>User not found</h2>}
      { friend && 
      <div className="flex items-center p-2 hover:bg-gray-600" onClick={handleSelect}>
        <img
          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
          alt="profile"
          className="w-7 h-7 rounded-full mr-3"
        ></img>
        <span>{friend.displayName}</span>
      </div>
      }
    </div>
  );
};

export default Search;
