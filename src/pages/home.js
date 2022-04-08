import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import {UserContext} from '../context/userContext'

import SideBar from '../component/sideBar'
import Template1 from '../media/Phone.png'
import Template2 from '../media/Phone 2.png'
import Template3 from '../media/Phone 3.png'
import Template4 from '../media/Phone 4.png'


const Home = () => {

    const [isLogin,setIslogin] = useContext(UserContext)
    const navigate = useNavigate()
    const [statusLoad,setStatusLoad]=useState(false)


  return (
    <div style={{height:"100vh",display:"flex"}} className="bg-light" onLoad={()=> setStatusLoad(true)}>
        <div style={{flex:"15%"}} >
            <SideBar status={statusLoad}/>
        </div>
        <div style={{flex:"85%"}}>
            <div style={{backgroundColor:"white"}}>
                <h3 className='py-3 ms-5'>Template</h3>
            </div>
            <div className='d-flex justify-content-center' style={{marginTop:"35px"}}>
                <div onClick={()=> navigate('/createlink')}>
                    <img src={Template1} alt="template1" style={{width:"250px"}} />
                </div>
                <div>
                    <img src={Template2} alt="template2" style={{width:"250px"}}/>
                </div>
                <div>
                    <img src={Template3} alt="template3" style={{width:"250px"}}/>
                </div>
                <div>
                    <img src={Template4} alt="template4" style={{width:"250px"}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home