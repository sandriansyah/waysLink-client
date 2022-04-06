import React,{useState} from 'react'
import { Modal } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'

import SideBar from '../component/sideBar'

import ImageLink from '../media/Rectangle 9.png'
import View from '../media/View.png'
import Edit from '../media/Edit.png'
import Delete from '../media/delete.png'
// import Loupe from '../media/loupe.png'

// import SearchIcon from '@mui/icons-material/Search';

const MyLinks = () => {

    const [show,setShow]= useState(false)

    // const navigate = useNavigate()

  return (
    <div style={{height:"100vh",display:"flex"}} className="bg-light">

        <Modal show={show} onHide={()=>setShow(false)} >
            <div className='py-5 px-3'>
                <p className='text-success' style={{fontSize:"25px"}}>you are sure you want to remove this link</p>
                <div className='d-flex justify-content-end'>
                    <button className='py-1 px-4 rounded me-3' style={{background:"red",border:"none"}}>Yes</button>
                    <button className='py-1 px-4 rounded' style={{background:"#d2d2d2",border:"none"}} onClick={()=>setShow(false)}>No</button>
                </div>
            </div>
        </Modal>

        <div style={{flex:"15%"}} >
            <SideBar/>
        </div>
        <div style={{flex:"85%"}}>
        <div style={{backgroundColor:"white"}}>
                <h6 className='py-3 ms-5'>My Links</h6>
            </div>
            <div className='d-flex px-5 justify-content-between align-items-center' style={{marginTop:"32px",marginBottom:"40px"}}>
                <div className='d-flex justify-content-start align' style={{flex:"15%"}}>
                    <h6 className='py-3' >All links</h6>
                    <span className='colorOrange mt-3 ms-2 h-25 text-light' style={{width:"22px",textAlign:"center",borderRadius:"10px"}}>1</span>
                </div>
                <div style={{flex:"70%"}} className='searchInput'>
                        <input placeholder='input your link' type="text" style={{width:"100%",borderTop:"none",borderRight:"none",borderLeft:"none",background:"none"}}/> 
                </div>
                <div className='d-flex justify-content-end' style={{flex:"15%"}}>
                    <button className='colorOrange py-1 px-3 fw-bold border-0 rounded' style={{color:"white"}}>Search</button>
                </div>
            </div>
            <div className='px-5 d-flex'>
                <div>
                    <img src={ImageLink} style={{width:"70px"}} alt="foto link"/>
                </div>
                <div className='d-flex justify-content-between w-100 ms-3'>
                    <div className='d-flex flex-column'>
                        <h6 className='mt-2'>WaysFood</h6>
                        <p>localhost:3000/waysfood</p>
                    </div>
                    <div className='d-flex flex-column'>
                        <h6 className='mt-2'>10</h6>
                        <p>visit</p>
                    </div>
                    <div>
                        <img src={View} alt="icon view" style={{width:"40px",marginLeft:"10px",marginTop:"18px"}}/>
                        <img src={Edit} alt="icon edit" style={{width:"40px",marginLeft:"10px",marginTop:"18px"}}/>
                        <img src={Delete} alt="icon delete" style={{width:"40px",marginLeft:"10px",marginTop:"18px"}} onClick={()=> setShow(true)}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyLinks