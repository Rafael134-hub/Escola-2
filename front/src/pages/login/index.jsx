import React, { useState } from "react";
import './styles.css'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { LuUserRound } from "react-icons/lu";

export default function Login(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const logar = async () => {
        try  {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                {
                    username: user,
                    password: password
                }
            )    
            console.log("Token Login: ", response.data.access)       
            localStorage.setItem('token', response.data.access)
            var token_stage = response.data.access
            navigate('/home')

        } catch (error){
            console.error(error)
        }
    }


  return(
    <>
      <div className="container">
        <h1>Login</h1>
        <input placeholder="   User" className="caixa" type="text" value={user} onChange={(e) => {setUser(e.target.value)}}></input>
        <input placeholder="   Password" className="caixa" type="password"  onChange={(e) => {setPassword(e.target.value)}}></input>
        <button className="button_forms" onClick={logar}>Send</button>
      </div>
    </>
  )
}

