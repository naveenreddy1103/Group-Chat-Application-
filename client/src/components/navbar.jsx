import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { store } from '../App'
import './navbar.css'


export const Navbar=()=>{
    const[token,setToken]=useContext(store)
    return(<div>
        {
            !token &&
            <nav id="nav">
                <h4>Navbar</h4>
                <div>
                <Link to="/register"><span>Register</span></Link>
                <Link to="/login"><span>Login</span></Link>
                </div>
            </nav>
        }
    </div>)
}