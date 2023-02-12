import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../sidebar/Sidebar';
import Chat from '../chat/Chat';
import { getUser } from '../../utils/getUser';
import { AuthContext } from '../../context/AuthContext';
const ChatPage = () => {

  const { currentUser, setIsLogged } = useContext(AuthContext)

    const [ user, setUser ] = useState({});
    
    
    useEffect(() => {
       setIsLogged(true)
    }, [])


  return (
    <div className='flex justify-center items-center bg-gray-100 h-screen'>
    <div className='w-3/5 h-3/5 bg-white flex rounded-lg overflow-hidden'>
     <Sidebar/>
     <Chat/>
     </div>
    </div>
  )

  
}


export default ChatPage
