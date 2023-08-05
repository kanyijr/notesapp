import React, {useState, useEffect} from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const AuthProvider = ({children}) => {
   
  let [status, setStatus] = useState(localStorage.getItem("Tokens")?true:false)
  let [name, setName] = useState()
  let [notes, setNotes] = useState()
  let [messages, setMessage] = useState()
  let [user_id, setUser] = useState()
 let [note, setNote] = useState({title:"", body:"new note", user:""})
 let history = useNavigate()


useEffect(()=>{if (notes){
  setUser(notes[0].user)
}}, [notes])


 

  let navigate = useNavigate()
  
 //this function runs only when component mounts the first time
  useEffect(()=>{
      let token  = localStorage.getItem("Tokens")
      if(token){
        setStatus(true)
        let data = JSON.parse(token)
        checkStatus()
        setName(jwt_decode(data.refresh).username)
        getData()
      }
    
  }, [])


//login function only called on submit
  const loginuser = async (e)=>{
     e.preventDefault()
     let response = await fetch("http://127.0.0.1:8000/api/auth/token/", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username:e.target.user.value, password:e.target.pass.value})
     })
    if (response.status !== 200){
          setMessage("invalid credentials!")
          navigate("/login")
    }
    else{
      let data  = await response.json()
      let decode = jwt_decode(data.refresh)
      setName(decode.username)
      console.log(data)
      localStorage.setItem("Tokens", JSON.stringify(data))
      setStatus(true)
      navigate("/")
    }
  }  




//this function is called every minute
  const checkStatus = async ()=>{
    if (status == true){
      let refrtoken = JSON.parse(localStorage.getItem("Tokens"))
      let url = "http://localhost:8000/api/auth/refresh/"
      let response = await fetch(url, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({refresh:refrtoken.refresh})
      })
      let data = await response.json()
      localStorage.setItem("Tokens", JSON.stringify(data))
      console.log("done")
      
    }


  }


 //function to log out a user
  const logout = ()=>{
    localStorage.removeItem("Tokens")
    navigate("/login")
    setStatus(false)
    setMessage("")

  } 

  //calls checkstatus every minute 
  setInterval(checkStatus, 200000)

 
 //function that fetches data from backend
 const getData = async ()=>{
  if (localStorage.getItem("Tokens")){
      let token  = JSON.parse(localStorage.getItem("Tokens")).access
      console.log(token)
      let url = "http://localhost:8000/api/notes/"
      let response = await fetch(url, {
          method:"GET", 
          headers:{"Authorization":`Bearer ${token}`}
      })
      let data = await response.json()
      
      setNotes(data)
  } 
}

//function to delete  a particular note
const deleteNote =async (pk)=>{
  let response = await fetch(`http://localhost:8000/api/notes/delete/${pk}/`, {
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:pk})
  })
  window.location.reload()
  
          
     
}
 
 // this is the context data passed down to every child of the context provider
  let contextdata = {
    loginuser:loginuser, 
    checkStatus:checkStatus,
    status:status,
    name:name, 
    logout:logout,
    messages:messages,
    getData:getData, 
    notes:notes,
    user_id:user_id,
    note:note,
    setNote:setNote,
    deleteNote:deleteNote
  
  }

  
 
  
  return (
    <div>
        <AuthContext.Provider value={contextdata}>
            {children}
        </AuthContext.Provider>
      
    </div>
  )
}

export default AuthProvider
