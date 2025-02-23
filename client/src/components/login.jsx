import { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import { Navbar } from "./navbar";

export const Login=()=>{
    const [data,setData]=useState({email:"",password:''});
    const [token,setToken]=useContext(store);
    let navigate=useNavigate();
    function valChange(e){
        setData({...data,[e.target.name]:e.target.value})
    }
    function formSubmit(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:1001/login',data)
        .then(Response=>{
            setToken(Response.data.token);
            // console.log(Response.data.token)
            alert('login successfully');
            navigate('/myprofile')
        })
        .catch((err)=>{
            console.log(err)
        })
        console.log(data)
    }
    return(<div>
         <Navbar />
        <center>
        <form onSubmit={formSubmit}>
                <dl>
                    <dt>email</dt>
                    <dd><input type="email" required name="email" onChange={valChange} placeholder="Email"></input></dd>
                    <dt>User Name</dt>
                    <dd><input type="password" required name="password" onChange={valChange} placeholder="Password"></input></dd>
                </dl>
                <input type="submit" value="Login"></input>
            </form>
        </center>
    </div>)
}