import React, {useContext, useEffect} from 'react'
import AuthContext from '../components/AuthContext'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'

const Home = () => {
    let navigate = useNavigate()
    let {status, name, logout} = useContext(AuthContext)
    useEffect(()=>{
         if (status==false){
            navigate("/login")
         }
    }, [])

   
    
  return (
    <div style={{backgroundColor:"#BDC1C6", width:"100vw", height:"100vh"}}> 
       <Navbar/>
       <Notes/>

       
            
            
      
    </div>
  )
}

export default Home
