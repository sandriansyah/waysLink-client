import React,{useEffect,useState} from 'react'

import {Alert} from 'react-bootstrap'

import SideBar from '../component/sideBar'


import {API} from '../midlewere/api'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate()

    const [dataUser,setDataUser]= useState([])

    const [inputProfile,setInputProfile]=useState({
        fullName: dataUser?.fullName,
        email:dataUser?.email
    })

    const [notif,setNotif] = useState(null)

    const getUser= async()=>{
        try {
            const response = await API.get('/user')
            setDataUser(response.data.findUser)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    const handleOnChange = async (e)=>{
        setInputProfile({
            ...inputProfile,
            [e.target.name]: e.target.value
        })
        console.log(inputProfile);
    }

    const handleEdit= async (e)=>{
        try {
            e.preventDefault()

            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }

            const body = JSON.stringify(inputProfile)
            const response = await API.patch("/user",body,config)
            if(response.status === 200){
                const alert = <Alert variant="success"> Edit Profile Success</Alert>

                setNotif(alert)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete= async (e)=>{
        try {
            e.preventDefault()

            const response = await API.delete("/user")
            if(response.status === 200){
                const alert = <Alert variant="danger"> delete Profile Success</Alert>

                setNotif(alert)
                navigate('/')
                localStorage.removeItem("token")
            }
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <div style={{height:"100vh",display:"flex"}} className="bg-light">
        <div style={{flex:"15%"}} >
            <SideBar/>
        </div>
        <div style={{flex:"85%"}}>
            <div style={{backgroundColor:"white"}}>
                <h6 className='py-3 ms-5'>My Account</h6>
            </div>
            <div>
            <h6 className='py-3 ms-5'>My Information</h6>
            </div>
            <div className='d-flex justify-content-center' style={{marginTop:"35px"}}>
                <div style={{backgroundColor:"white",padding:"30px",width:"90%",borderRadius:"10px"}} className="flex flex-column" >
                    {notif}
                    <label className='searchInput w-100'
                    style={{marginBottom:"50px"}} >
                        Name
                        <input name='fullName' id="standard-basic"className='w-100 ' defaultValue={dataUser.fullName} style={{height:"50px",borderTop:"none",borderRight:"none",borderLeft:"none",fontSize:"30px"}}
                        onChange={handleOnChange}/>
                    </label>
                    <label className='searchInput  w-100'>
                        Email
                        <input name='email' id="standard-basic-adorment"  defaultValue={dataUser.email} className='w-100' style={{height:"50px",borderTop:"none",borderRight:"none",borderLeft:"none",fontSize:"30px"}}
                        onChange={handleOnChange}/>
                    </label>  
                </div>
            </div>
            <div className='d-flex justify-content-end mt-5' style={{width:"90%",margin:"auto"}}>
                <button className='colorOrange border-0 rounded px-3 py-1 fw-bold' style={{color:"white"}} onClick={handleEdit}>
                    Save Account
                </button>
                <button  className='ms-4 border-0 rounded px-3 py-1 fw-bold' style={{background:"red",color:"white"}}
                onClick={handleDelete}>
                    Delete Account
                </button>
            </div>
        </div>
    </div>
  )
}

export default Profile