import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";

const Input = () => {

  const { currentUser } = useContext(AuthContext)
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data } = useContext(ChatContext);


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (err) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser._id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser._id,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser._id), {
      [data.chatId + ".lastMessage"]: {
        text
      },

      [data.chatId+".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },

      [data.chatId+".date"]: serverTimestamp()
    })

    setText("")
    setImg(null)
  };
  
  return (
    <div className="h-12 bg-gray-300 flex justify-between items-center p-2">
      <input
        type="text"
        className="bg-gray-300 p-2 outline-none"
        placeholder="Type Something.."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <div className="flex gap-2">
        <AttachFileIcon className="cursor-pointer" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          name="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <lable htmlFor="file">
          <AddPhotoAlternateIcon className="cursor-pointer"/>
        </lable>
        <SendIcon onClick={handleSend} className="cursor-pointer"/>
        {/* <button type='button'>Send</button> */}
      </div>
    </div>
  );
};

export default Input;
