import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import DashboardHome from './pages/DashboardHome';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {

    if (localStorage.getItem('user') != null) {
      setisLoggedIn(true)
      console.log('logged in')
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (

          //private routes
          <Route path="/" element={<DashboardHome />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
