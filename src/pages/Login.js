import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../components/AuthContext'
import {useNavigate} from 'react-router-dom'




const Login = () => {
  let [username, setUser] = useState()
  let [password, setPass] = useState()
  let {loginuser, status, messages} = useContext(AuthContext)
  let navigate = useNavigate()
  // const handleChange = (e)=>{
  //       if (e.target.name == "username"){
  //        setUser(e.target.value)
  //       }
  //       else if(e.target.name == "password"){
  //         setPass(e.target.value)
  //       } 
 
  // }

  useEffect(()=>{
    if (status==true){
        navigate('/')

    }
  }, [])
  useEffect(()=>{
    console.log("re-rendered")
   
  }, [username, password])  
  
  useEffect(()=>{
    console.log(messages)
  }, [messages])
  return (
    <div>
      <form onSubmit={loginuser}>
            <label>Username: </label>
            <input type='text' name='user'/>
            <br/>
            <label>Password: </label>
            <input type='password' name='pass' />
            <br/>
            <input type='submit' value="login"/>
      </form>
      
    </div>
  )
}

export default Login
