import React,{useState} from 'react'
import {Modal} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'

import Logo from "../media/Frame.png"
import Pc from "../media/PC.png"
import Phone from "../media/Phone.png"

const Landing = () => {

    const [show,setShow] = useState(false)
    const [showLogin,setShowLogin] = useState(false)
    
    const navigate= useNavigate()

return (
    <div className='containerLanding vh-100'>

        <Modal className="modalFromBosstrap mt-5 " show={show}  onHide={()=> setShow(false)}> 
            <div class="modalSignUp p-4">
                <form className="d-inline" >
                    <h3 className='fw-bold mb-4'>Register</h3>
                    {/* {message} */}
                    <div>
                        <input type="email" name="email" placeholder="Email" className='w-100 mb-3 bgInput' />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" className='w-100 mb-3 bgInput' />          
                    </div>
                    <div>
                        <input type="text" name="fullName" placeholder="Full Name" className='w-100 mb-3 bgInput' />          
                    </div>
                    <button type="submit" className='w-100 colorOrange border-0 text-light fw-bold' style={{height:"35px",borderRadius:"5px"}} onClick={()=>navigate("/home")}>
                        Sign Up
                    </button>
                    <p className='text-center mt-2'>Already have an account ? Klik <b  style={{cursor:"pointer"}}>Here</b> </p>
                </form>
            </div>                  
        </Modal>

        <Modal className="modalFromBosstrap mt-5 " show={showLogin}  onHide={()=> setShowLogin(false)}> 
            <div class="modalSignUp p-4">
                <form className="d-inline" >
                    <h3 className='fw-bold mb-4'>Login</h3>
                    {/* {message} */}
                    <div>
                        <input type="email" name="email" placeholder="Email" className='w-100 mb-3 bgInput' />
                    </div>
                    <div>
                        <input type="text" name="fullName" placeholder="Full Name" className='w-100 mb-3 bgInput' />          
                    </div>
                    <button type="submit" className='w-100 colorOrange border-0 text-light fw-bold' style={{height:"35px",borderRadius:"5px"}} onClick={()=>navigate("/home")}>
                        Login
                    </button>
                    <p className='text-center mt-2'>Don't have an account ? Klik <b  style={{cursor:"pointer"}}>Here</b> </p>
                </form>
            </div>                  
        </Modal>

        <div className='landingNav'>
            <div className='logo'>
                <img src={Logo} alt="logo"/>
            </div> 
            <div className='button ' >
                <button style={{background:"none",border:"none"}} onClick={()=> setShowLogin(true)}>
                    Login
                </button>
                <button className='colorOrange border-0 ms-3 rounded text-light' onClick={()=> setShow(true)}>
                    Register
                </button>
            </div>
        </div>
        
        <div className='landing' >
            <div className='landingLeft'>
                <h1 style={{fontSize:"50px",color:"white"}}>
                    The Only Link You’ll Ever Need</h1>
                <p style={{fontSize:"21px",color:"white"}}>
                    Add a link for your Social Bio and optimize your social media traffic.
                    <br/> <br/>
                    safe, fast and easy to use</p>
                <div>
                    <button className='bg-black text-white border-0 rounded py-1 px-3 mt-5' onClick={()=> setShow(true)}>Get Started For Free</button>
                </div>                
            </div>
            <div className='landingRight' style={{marginTop:"120px",marginLeft:"120px"}}>
                <img src={Pc} alt="pc" style={{width:"380px",marginRight:"-200px"}} />
                <img src={Phone} alt="phone" style={{width:"180px",marginLeft:"-270px",marginBottom:"-60px"}}/>
            </div>
        </div>
    </div>
  )
}

export default Landing