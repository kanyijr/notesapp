import React, { useContext, useState } from 'react'
import AuthContext from './AuthContext'

const Navbar = () => {
    let [nav, setNav] = useState()
    let {status, name, logout} = useContext(AuthContext)

    const handleChange = (e)=>{
        setNav(e.target.value)
    }
  return (
    <div class="container-fluid p-0" style={{backgroundColor:"#303134"}}>
        <nav class="navbar navbar-expand-lg  mx-0 d-flex justify-content-between text-light">
            <h2 class="navbar-brand p-2 text-light">Notes</h2>
            <div class="input-group">
                <div class="dropdown w-50 mx-auto ps-1 border border-1 rounded-pill pt-1 input-group" >
                    <form class="w-100 rounded" style={{background:"transparent", border:'none', outline:"none"}}> 
                            <input type='text' class="w-50 ms-2 me-1 rounded float-start  no-border p-2 my-1" data-bs-toggle="dropdown" style={{height:"70%", 
                        border:"none", outline:"none", background:"transparent", color:"#E8EAED", backgroundColor:"rgba(189, 193, 198, 0.1)"}} onChange={handleChange}/>
                    </form>
           
                    
                    <div class="dropdown-menu ">
                        <p class="dropdown-item">Hello</p>

                    </div>

                </div>
                
            </div>
            {status==true?<><h6 onClick={logout} class="nav-item  px-2 my-0 me-0 h-100"><small>Logout</small><span><i class="bi bi-box-arrow-right display-4 nav-link " style={{color:"white", width:"40px", cursor:"pointer"}}></i> </span></h6>
            <span ><small class="fw-bold mx-2">{name}</small></span>
           </>: <li class="nav-item"><span class="nav-link">Login</span></li>}
        </nav>
      
    </div>
  )
}

export default Navbar
