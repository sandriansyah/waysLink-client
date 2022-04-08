import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import {UserContext} from '../context/userContext'

import Logo from "../media/Frame.png"
import Template from "../media/template.png"
import Profile from "../media/profile.png"
import Link from "../media/link.png"
import Logout from "../media/logout.png"

const SideBar = () => {

    
    const [isLogin,setIslogin] = useContext(UserContext)
    
    const navigate = useNavigate()

    const handleLogout = ()=>{

        setIslogin({
            type:"LOGOUT",
        })

        navigate('/')
    }

  return (
    <div className='d-flex flex-column pt-3' style={{justifyContent:"space-between",height:"100vh",paddingLeft:"50px",backgroundColor:"white"}}>
        <div>
            <img src={Logo} alt="logo" style={{width:"120px"} } className="mb-5"/>
            <div className='d-flex' style={{cursor:"pointer"}} onClick={()=> navigate('/home')}>
                <img src={Template} alt="templateIcon" className='me-3 mb-5' />
            <span>Template</span>
                
            </div>
            <div className='d-flex' style={{cursor:"pointer"}} onClick={()=> navigate('/profile')}>
                <img src={Profile} alt="profileIcon" className='me-3 mb-5'  />
                <span>Profile</span>
            </div>
            <div className='d-flex' style={{cursor:"pointer"}} onClick={()=> navigate('/mylink')}>
                <img src={Link} alt="linkIcon" className='me-3 mb-5' />
                <span>My Link</span>
            </div>
        </div>
        <div className='d-flex'style={{cursor:"pointer"}} onClick={handleLogout}>
            <img src={Logout} alt="logoLogout" className='me-3 mb-5'/>
            <span>Logout</span>
        </div>
    </div>
  )
}

export default SideBar