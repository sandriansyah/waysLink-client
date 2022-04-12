import React,{useState,useContext} from 'react'
import {Modal,Alert} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'

import {UserContext} from '../context/userContext'

import Logo from "../media/Frame.png"
import Pc from "../media/PC.png"
import Phone from "../media/Phone.png"

import { API,setAuthToken} from '../midlewere/api'

const Landing = () => {

    const [isLogin,setIslogin] = useContext(UserContext)

    const [message,setMessage] = useState(null)

    const [show,setShow] = useState(false)
    const [showLogin,setShowLogin] = useState(false)
    
    const navigate= useNavigate()

    const [form,setForm] = useState({
        email:"",
        password:"",
        fullName:""
    })

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
    }

    const handleRegister = async(e) =>{
        try {
            e.preventDefault();

            // configuratton content-type
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }
            // conver form data to string
            const body = JSON.stringify(form)

            //insert data to database
            const response = await API.post("/register",body,config)
            console.log(response);

            if(response.data.status == "success"){

                const alert = <Alert variant="success" className="py-1" > success </Alert>

                setMessage(alert)
                // navigate("/home")
            }else{
                const alert = <Alert variant="danger" className="py-1" > failed </Alert>

                setMessage(alert)
            }

        } catch (error) {
            console.log(error);
            const alert = (
                <Alert variant="danger" className="py-1" >
                    failed
                </Alert>
            );
            setMessage(alert);
        }
    }

    const [formLogin,setFormLogin] = useState({
        email:"",
        password:"",
    })

    const handleChangeLogin =(e)=>{
        setFormLogin({
            ...formLogin,
            [e.target.name]:e.target.value,
        })
    }

    const handleLogin = async(e) =>{
        try {
            e.preventDefault();

            // configuratton content-type
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }
            // conver form data to string
            const body = JSON.stringify(formLogin)
        
            //insert data to database
            const response = await API.post("/login",body,config)
            console.log(response);

            if(response.data.status == "success"){

                setAuthToken(response.data.data.token)

                setIslogin({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data
                })

                const alert = <Alert variant="success" className="py-1" > success </Alert>

                setMessage(alert)
                navigate("/home")
            }else{
                const alert = <Alert variant="danger" className="py-1" > failed </Alert>

                setMessage(alert)
            }

        } catch (error) {
            console.log(error);
            const alert = (
                <Alert variant="danger" className="py-1" >
                    failed
                </Alert>
            );
            setMessage(alert);
        }
    }

return (
    <div className='containerLanding vh-100'>

        <Modal className="modalFromBosstrap mt-5 " show={show}  onHide={()=> {setShow(false);setMessage(false)}}> 
            <div className="modalSignUp p-4">
                <form className="d-inline" onSubmit={handleRegister} >
                    {message}
                    <h3 className='fw-bold mb-4'>Register</h3>
                    <div>
                        <input type="email" name="email" placeholder="Email" className='ps-2 w-100 mb-3 bgInput' 
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" className='w-100 mb-3 bgInput ps-2' 
                        onChange={handleChange}/>          
                    </div>
                    <div>
                        <input type="text" name="fullName" placeholder="Full Name" className='w-100 mb-3 bgInput ps-2' 
                        onChange={handleChange}/>          
                    </div>
                    <button type="submit" className='w-100 colorOrange border-0 text-light fw-bold' style={{height:"35px",borderRadius:"5px"}}>
                        Sign Up
                    </button>
                    <p className='text-center mt-2'>Already have an account ? Klik <b  style={{cursor:"pointer"}}
                    onClick={()=>{setShowLogin(true); setShow(false)}}>Here</b> </p>
                </form>
            </div>                  
        </Modal>

        <Modal className="modalFromBosstrap mt-5 " show={showLogin}  onHide={()=> {setShowLogin(false);setMessage(false)}}> 
            <div className="modalSignUp p-4">
                <form className="d-inline" onSubmit={handleLogin}>
                {message}
                    <h3 className='fw-bold mb-4'>Login</h3>
                    <div>
                        <input type="email" name="email" placeholder="Email" className='w-100 mb-3 bgInput ps-2' 
                        onChange={handleChangeLogin}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" className='w-100 mb-3 bgInput ps-2' 
                        onChange={handleChangeLogin} />          
                    </div>
                    <button type="submit" className='w-100 colorOrange border-0 text-light fw-bold' style={{height:"35px",borderRadius:"5px"}}>
                        Login
                    </button>
                    <p className='text-center mt-2'>Don't have an account ? Klik <b  style={{cursor:"pointer"}}
                    onClick={()=>{setShowLogin(false); setShow(true)}}>Here</b> </p>
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