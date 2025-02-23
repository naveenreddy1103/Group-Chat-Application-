import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";



export const Register=()=>{
    const [data,setData]=useState({username:"",email:"",password:"",confirmpassword:""});
    let navigate=useNavigate();
    const valChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const formSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:1001/register',data)
        .then(Response=>{
            alert("Register successfully");
            navigate('/login');
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
                    <dt>User Name</dt>
                    <dd><input type="text" name="username" required onChange={valChange} placeholder="User Name"></input></dd>
                    <dt>email</dt>
                    <dd><input type="email" required name="email" onChange={valChange} placeholder="Email"></input></dd>
                    <dt>Password</dt>
                    <dd><input type="password" required name="password" onChange={valChange} placeholder="Password"></input></dd>
                    <dt>Confirm Password</dt>
                    <dd><input type="password" name="confirmpassword" onChange={valChange} placeholder="Confirm Password"></input></dd>
                </dl>
                <input type="submit" value="Register"></input>
            </form>
        </center>
    </div>)
}