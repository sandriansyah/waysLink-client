import React,{useContext,useEffect,useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./app.css"
import {BrowserRouter as Router,Routes,Route,useNavigate} from "react-router-dom"

import {UserContext} from '../src/context/userContext'

import Landing from "../src/pages/Landing"
import Home from "./pages/home"
import Profile from "./pages/profile"
import CreateLink from "./pages/createLink"
import EditLink from "./pages/editLink"
import MyLinks from "./pages/mylink"
import DisplayLinks from "./pages/displayLinks"

import {API,setAuthToken} from '../src/midlewere/api'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  const navigate= useNavigate()

  const [user,setUser]= useContext(UserContext)

  // console.log(user);

  useEffect(()=>{

    if(!localStorage.token){
      navigate('/')
    }
  },[user])

  const checkUser = async()=>{
    try {     
      const response = await API.get("/checkauth")
    
      if(response.status === 404){
        return setUser({
          type:"AUTH_ERROR"
        })
      }
      
      
      let payload = response.data.user
      payload.token = localStorage.token 

      setUser({
        type:"USER_SUCCESS",
        payload
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
      // <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/createlink" element={<CreateLink/>} />
          <Route exact path="/editlink/:id" element={<EditLink/>} />
          <Route exact path="/mylink" element={<MyLinks/>} />
          <Route exact path="/display/:id" element={<DisplayLinks/>} />
        </Routes>
      // </Router>
  );
}

export default App;
