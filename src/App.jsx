import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import './app.css'
import { useState, createContext } from 'react';
import Register from './components/Register';
import Login from './components/Login';




function App() {
  const [token, setToken] =useState(localStorage.getItem('token') || null)
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path ="/register" element= {<Register />}/>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/profile" element={<ProfilePage token = {token} />} />
      <Route path="/chat" element={<ChatPage token = {token}/>} />
    </Routes>
  );
}

export default App;
