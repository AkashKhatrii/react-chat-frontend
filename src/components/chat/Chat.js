import React, { useContext } from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../context/ChatContext';
const Chat = () => {
  const { data } = useContext(ChatContext)
  // console.log("chat", data)
  return (
    <div className='flex-col w-full'>
      <div className='flex justify-between items-center bg-gray-400 w-full p-3'>
        <span>{data.user?.displayName}</span>
        <div className='flex gap-4'>
            <VideocamIcon/>
            <PersonAddIcon/>
            <MoreHorizIcon/>
        </div>
      </div>

      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
