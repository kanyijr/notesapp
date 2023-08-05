import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import AuthProvider from './components/AuthProvider'
import Home from './pages/Home'
import NotePage from './pages/NotePage'
import NewNote from './pages/NewNote'



function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
          
              <Route index path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path="/note/:id" element={<NotePage/>}/>
              <Route path='/note/new' element={<NewNote/>}/>
        
          </Routes>
        </AuthProvider>  
      </Router>
     
         
    
     
    </div>
  );
}

export default App;
