import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import InquiryLayout from './layouts/InquiryLayout/InquiryLayout';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css'

const App = () => {
  const { dispatch, isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' Component={isLoggedIn? InquiryLayout : AuthLayout}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App