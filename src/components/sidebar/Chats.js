import { onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc } from 'firebase/firestore'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
const Chats = () => {


  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const {dispatch } = useContext(ChatContext)

  useEffect(() => {

    const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser._id ), (doc) => {
      setChats(doc.data())
    })

    return () => {
      unsub()
    }
  }

  currentUser._id && getChats();
  }, [currentUser._id])

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }
  return (

    
    <div className='flex-col'>
    {Object.entries(chats)?.map(chat => (
      <div className="flex items-center p-2 hover:bg-gray-600 cursor-pointer" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img
          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
          alt="profile"
          className="w-8 h-8 rounded-full mr-3"
        ></img>
        <div className='flex-col'>
        <span className='font-medium'>{chat[1].userInfo.displayName}</span>
        <p className='text-xs'>{chat[1].lastMessage?.text}</p>
        </div>
      </div>

      ))}
    </div>
    
  )
}
// sort((a, b) => b[1].date - a[1].date).
export default Chats
