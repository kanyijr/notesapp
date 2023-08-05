import React, {useContext, useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import AuthContext from '../components/AuthContext'
const NotePage = () => {
    let [currDate, setDate] = useState()
    // let {notes, setNotes} = useContext(AuthContext)
    let [note, setNote] = useState()
    let param  = useParams()
    
    let [number, setNumber] = useState()
  
    let history = useNavigate()
    useEffect(()=>{
     
      getNote()
    }, [])
   // function to get specific note
   const getNote = async ()=>{
         let url = `http://localhost:8000/api/notes/${param.id}/`
         let response = await fetch(url)
         let data = await response.json()
         setNote(data)
         setNumber(data.body.match(/\s/g).length + 1)

   }
    
    //function to handle going  to previous page 
    const goBack = ()=>{
       history(-1)
    }

    //function to handle change
    const handleChange = (e)=>{
           if(e.target.name === "Title"){
            //  currentNote.title = e.target.value
            setNote({...note, title:e.target.value})
           }
           else{
            setNote({...note, body:e.target.value})
           }
          
        
          
         
    }
    // function to handle submission
    const handleSubmit = async()=>{
         let url = `http://localhost:8000/api/notes/update/${note.id}/`
         let response = await fetch(url, {
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id:note.id, title:note.title, body:note.body, user:note.user})
         })
         let data  = await response.json()
         console.log(data)
         history(-1)
         
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
            {note?<><input type='text' name="Title" style={{width:"90%", margin:"auto", border:"none", outline:"none", color:"rgba(189, 193, 198, 0.6)", backgroundColor:"rgba(48, 49, 52, 0.4)"}} value={`Title: ${note.title}`} placeholder='Title...'  onChange={handleChange}/>

<textarea style={{height:"80%", backgroundColor:"rgba(48, 49, 52, 0.4)", width:"90%", margin:"auto", color:"#BDC1C6", outline:"none", border:"none"}} class=" mx-auto my-auto ps-1" value={note.body} onChange={handleChange}>
    <span   class="ms-0 me-0 float-start fw-bold " style={{color:"#BDC1C6"}}>{note.body}   </span>
</textarea></>:""}
           
            
       </div>
    </div>
  )
}

export default NotePage
