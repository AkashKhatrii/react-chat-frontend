import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import ChatPage from './components/chatpage/ChatPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/chat' element={<ChatPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
