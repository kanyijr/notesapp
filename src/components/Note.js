import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from './AuthContext'


const Note = ({note, key}) => {
  let {deleteNote} = useContext(AuthContext)
  let date = new Date(note.updated).toLocaleDateString()
  return (
    <div class="w-100 my-1 p-2 " style={{backgroundColor:"rgba(48, 49, 52, 0.5)", height:"100px", cursor:"pointer"}}>
        <Link to={`/note/${note.id}`}><span   class="ms-0 me-0 float-start fw-bold " style={{color:"#BDC1C6"}}>{note.title}  <small style={{color:"rgba(189, 193, 198, 0.6)"}}>{note.body}</small> </span></Link>
        <small onClick={()=>{deleteNote(note.id)}}><i class="bi bi-trash-fill m-4 float-end" style={{color:"rgba(189, 193, 198, 0.4)"}} ></i></small>
        <small class=" mb-1 me-0 ms-5"  style={{color:"rgba(189, 193, 198, 0.4)"}}>{date}</small>

      
    </div>
  )
}

export default Note
