import logo from './logo.svg';
import './App.css';
import Login from './login-logout/Login';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <ToastContainer/>
    <Login/>
    <Routes>
      
    </Routes>
    </>
  );
}

export default App;
