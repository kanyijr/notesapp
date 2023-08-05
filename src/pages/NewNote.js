import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../components/AuthContext'
import {useNavigate} from 'react-router-dom'

const NewNote = () => {
  let {user_id, note, setNote} = useContext(AuthContext)
  let [currDate, setDate] = useState()
  let [number, setNumber] = useState()
  let history = useNavigate()
 
  useEffect(()=>{
    if(!note.body.match(/\s/g)){
        setNumber(0)
    }else{
        setNumber(note.body.match(/\s/g).length + 1)
    }
}, [note])
  

  // function to handle change of input elements
  const handleChange = (e)=>{
       if (e.target.name ==="Title"){
           setNote({...note, title:e.target.value})
       }else{
           setNote({...note, body:e.target.value})
       }
  }

  // function to handle submission
  const handleSubmit = (e)=>{
        let url = "http://localhost:8000/api/notes/create/"
        let xhr = new XMLHttpRequest()
        xhr.open("POST", url)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = ()=>{
            console.log(xhr.response)
        }
        xhr.send(JSON.stringify({title:note.title, body:note.body, user:user_id}))
        history(-1)
        
        // let response = await fetch(url, {
        //     method:"POST",
        //     headers:{"Content-Type":"application/json"},
        //     body:JSON.stringify({title:note.title, body:note.body, user:user_id})
        // })
        // let data = response.json()
        // console.log(data)
  }
   // function to show clock
   const currdate = ()=>{
    setDate(new Date().toLocaleString())
    }
    //updates the time every second
    setInterval(currdate, 1000)
  return (
    <div style={{backgroundColor:"rgba(48, 49, 52, 0.6)" , height:"100vh"}} class="p-3">
        <div class="w-50 mx-auto mt-3 mb-0 rounded my-auto" style={{height:"75vh", backgroundColor:"rgba(48, 49, 52, 0.6)", margin:"auto"}}>
            <div class="mt-2 w-100  mb-3" style={{backgroundColor:"rgba(48, 49, 52, 1)", height:"10%"}}>
                <small class="fw-bold float-left mt-3 ms-0" style={{color:"rgba(189, 193, 198, 0.6)"}}><i class="bi bi-clock"></i> {currDate}</small>
                <span class="fw-bold mt-3 float-end me-2" style={{color:"#BDC1C6"}}>{number} words</span>
                <i class="bi bi-chevron-left float-start mt-3 ms-2" style={{color:"white", cursor:"pointer"}} onClick={handleSubmit}></i>

            </div>
        
            <input type='text' name="Title" style={{width:"90%", margin:"auto", border:"none", outline:"none", color:"#BDC1C6", backgroundColor:"rgba(48, 49, 52, 0.4)"}} value={note.title} placeholder='Title...'  onChange={handleChange}/>

            <textarea style={{height:"80%", backgroundColor:"rgba(48, 49, 52, 0.4)", width:"90%", margin:"auto", color:"#BDC1C6", outline:"none", border:"none"}} class=" mx-auto my-auto ps-1" value={note.body} onChange={handleChange}>
                {/* <span   class="ms-0 me-0 float-start fw-bold " style={{color:"#BDC1C6"}}>{currentNote.body}   </span> */}
            </textarea>
        </div>
    </div>
  )
}

export default NewNote
