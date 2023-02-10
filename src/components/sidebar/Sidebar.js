import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
const Sidebar = () => {
  
  return (
    <div className='w-2/5 bg-gray-300'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar
