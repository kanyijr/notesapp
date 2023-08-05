import React, {useEffect, useState, useContext} from 'react'
import AuthContext from './AuthContext'
import ListItem from './ListItem'
import {Link} from 'react-router-dom'

const Notes = () => {
    let {getData, notes} = useContext(AuthContext)
    let [currDate, setDate] = useState()
    // let [notes, setNotes] = useState()
    // useEffect(()=>{
    //   getData()
      

    // }, [])
    
    useEffect(()=>{console.log(notes)}, [notes])
    // const getData = async ()=>{
    //     if (localStorage.getItem("Tokens")){
    //         let token  = JSON.parse(localStorage.getItem("Tokens")).access
    //         console.log(token)
    //         let url = "http://localhost:8000/api/notes/"
    //         let response = await fetch(url, {
    //             method:"GET", 
    //             headers:{"Authorization":`Bearer ${token}`}
    //         })
    //         let data = await response.json()
            
    //         setNotes(data)
    //     } 
    // }   
    
    
    const currdate = ()=>{
        setDate(new Date().toLocaleString())
    }

    setInterval(currdate, 1000)
    let notesLength 
    if(notes){
      notesLength = notes.length
    }else{
      notesLength = ""
    }
  return (
    <div class="w-50 mx-auto mt-3 mb-0 rounded" style={{height:"75vh", backgroundColor:"rgba(48, 49, 52, 0.6)", overflowY:"scroll"}}>
        <div class="mt-2 w-100  mb-0" style={{backgroundColor:"rgba(48, 49, 52, 1)", height:"10%"}}>
            <Link to={"/note/new"}><h3 class="mb-1 float-end me-3 mt-2"><i class="bi bi-plus-circle-fill" style={{color:'white', cursor:"pointer"}}></i></h3></Link>
            <span class="fw-bold mt-3 float-end me-2" style={{color:"#BDC1C6"}}>Create Note</span>
            <small class="fw-bold float-left mt-3 ms-0" style={{color:"rgba(189, 193, 198, 0.6)"}}><i class="bi bi-clock"></i> {currDate}</small>
            <small class="float-start ms-3" style={{color:"rgba(189, 193, 198, 0.6)"}}>Notes: {notesLength}</small>
           
        </div>
       
       
        <hr class="border border-2 mt-0 mb-2"/>
        {notes?notes.map((note, index)=>(<ListItem obj={note} key={index}/>)):""}
     

        
      
    </div>
  )
}

export default Notes
