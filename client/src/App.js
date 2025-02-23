// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter ,Routes,Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Myprofile } from "./components/myprofile";
import { createContext, useState } from "react";





export const store=createContext();

function App() {
 const [token,setToken]=useState(null)
  return (
    <div className="container-fluid bg-image">
      
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
     
         <Routes>
            <Route path='/' element={<Navbar />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/myprofile" element={<Myprofile />}></Route>
            <Route path="*" element={<h1>Wrong path</h1>}></Route>
         </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
