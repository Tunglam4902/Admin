import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Admin from './pages/admin';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='admin' element={<Admin/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
