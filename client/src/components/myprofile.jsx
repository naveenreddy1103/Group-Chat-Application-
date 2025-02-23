import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import axios from "axios";
import './navbar.css';
import moment from 'moment';
import Moment from 'react-moment'




export const Myprofile=()=>{
    const [token,setToken]=useContext(store);
    const [user,userData]=useState({username:'',email:''});
    const [allmsg,setAllmsg]=useState([]);
    const [newmsg,setnewMsg]=useState("")
    let navigate=useNavigate();
       useEffect(()=>{
        if(!token){
        //    alert('security issue');
           navigate('/login');
        }
        else{
            axios.get('http://127.0.0.1:1001/myprofile',{
                headers:{'token':token}
            }).then(Response=>{
               userData(Response.data);
               console.log(Response.data)
            }).catch(err=>console.log(err));
            axios.get("http://127.0.0.1:1001/getmsg",{
                headers:{'token':token}
            }).then((response)=>{
                 setAllmsg(response.data);
                 console.log(response.data);
            }).catch(err=>console.log(err));
        }
    },[]);

    const formSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:1001/addmsg',{text:newmsg},{
            headers:{'token':token}
        })
        .then(res=>setAllmsg(res.data))
        .catch(err=>console.log(err));
    }

    if(!token){
           navigate('/login');
        }
    
    
    return(<div>
         <nav id="nav">
                <h4>Dashboard</h4>   
            </nav>
       {
        user &&
        <div style={{display:"flex",justifyContent:"center",marginTop:"30px",marginBottom:"30px"}}>
            <center style={{border:"1px black solid",width:"450px",height:'450px'}}>
            <div style={{height:"350px",width:"400px",overflow:"auto",margin:"5px"}}>
                {
                    allmsg.map(msg=><div style={{height:"80px",overflow:'auto', width:"320px", border:"1px solid black",margin:'3px',textAlign:'start', padding:"4px"}}>
                           <span><b>{msg.username}</b></span><span style={{fontSize:"12px" }}><Moment format="hh:mm:ss">{msg.date}</Moment></span>
                           <p>{msg.text}</p>
                    </div>)
                }
            </div>
            <form onSubmit={formSubmit} className="d-flex">
                <input type="text" placeholder="enter message" onChange={(e)=>{setnewMsg(e.target.value)}} className="me-2 ms-3 form-control w-50"></input>
                <input type="submit" value="Send Message" className="bg-primary btn"></input>
            </form>
            <div className="mb-2">
                <div>Welcome : {user.username}</div>
                <button style={{backgroundColor:"lightblue"}} onClick={()=>setToken(null)}>Sign Out</button>
            </div>
        </center>
        </div>
       }
        
    </div>)
}