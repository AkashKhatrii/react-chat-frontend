import { onSnapshot, doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db } from '../../firebase'
import Message from './Message'

const Messages = () => {

  const { currentUser } = useContext(AuthContext)

  const { data } = useContext(ChatContext)

  const [ messages, setMessages ] = useState([])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub();
    };
  }, [data.chatId])
  return (
    <div className='h-[calc(100%-96px)] p-2 overflow-scroll overscroll-x-none'>
     {messages.map(message => (
      <Message message={message} key={message.id}/>
     ))}
    </div>
  )
}

export default Messages
