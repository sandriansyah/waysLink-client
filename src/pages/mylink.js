import React,{useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import SideBar from '../component/sideBar'

import ImageLink from '../media/Rectangle 9.png'
import View from '../media/View.png'
import Edit from '../media/Edit.png'
import Delete from '../media/delete.png'

import {API} from '../midlewere/api'

const MyLinks = () => {

    const [show,setShow]= useState(false)
    const [groupLink,setGroupLink] = useState([])
    const [idDelete,setIdDelete] = useState(null)

    const navigate = useNavigate()

    const totalGroup = groupLink.length

    useEffect(()=>{
        getGroups()
    },[])

    const getGroups = async ()=>{
        try {
            const response = await API.get('/grouplink')
            
            setGroupLink(response.data.getData)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleBtnDel= async(id)=>{
        try {
            setShow(true)
            setIdDelete(id)
        
        } catch (error) {
            console.log(error);
        }
    }

    const deleteGroup = async ()=>{
        try {
            const response = API.delete(`/grouplink/${idDelete}`)
            console.log(response);
            
            setShow(false)
            getGroups()
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleViewLink = async (id)=>{
        try {
            const idGroup = id
            navigate(`/display/${idGroup}`)
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id)=>{
        try {
            const uniqueLink = id
            console.log(uniqueLink);
            navigate(`/editlink/${uniqueLink}`)
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div style={{height:"100vh",display:"flex"}} className="bg-light">

        <Modal show={show} onHide={()=>setShow(false)} >
            <div className='py-5 px-3'>
                <p className='text-success' style={{fontSize:"25px"}}>you are sure you want to remove this link</p>
                <div className='d-flex justify-content-end'>
                    <button className='py-1 px-4 rounded me-3' style={{background:"red",border:"none"}} onClick={deleteGroup} >Yes</button>
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
                    <span className='colorOrange mt-3 ms-2 h-25 text-light' style={{width:"22px",textAlign:"center",borderRadius:"10px"}}>{totalGroup}</span>
                </div>
                <div style={{flex:"70%"}} className='searchInput'>
                        <input placeholder='input your link' type="text" style={{width:"100%",borderTop:"none",borderRight:"none",borderLeft:"none",background:"none"}}/> 
                </div>
                <div className='d-flex justify-content-end' style={{flex:"15%"}}>
                    <button className='colorOrange py-1 px-3 fw-bold border-0 rounded' style={{color:"white"}}>Search</button>
                </div>
            </div>
        <div className='scroll mx-3' style={{overflow:"scroll",height:"400px",background:"white"}}>
            {groupLink.map((item)=>{
                return( 
                <div key={item.id} className='px-5 d-flex mb-3'>
                    <div>
                        <img src={item.image} style={{width:"70px",width:"100px",height:"100px"}} alt="foto link"/>
                    </div>
                    <div className='d-flex justify-content-between w-100 ms-3'>
                        <div className='d-flex flex-column'>
                            <h6 className='mt-2'>{item.title}</h6>
                            <p style={{color:"grey"}}>localhost:3000/{item.uniqueLink}</p>
                        </div>
                        <div className='d-flex flex-column'>
                            <h6 className='mt-2'>{item.viewCount}</h6>
                            <p style={{fontSize:"20px",fontWeight:"bold"}}>visit</p>
                        </div>
                        <div>
                            <img src={View} alt="icon view" style={{width:"40px",marginLeft:"10px",marginTop:"18px"}} 
                            onClick={()=> handleViewLink(item.uniqueLink)}/>
                            <img src={Edit} alt="icon edit" style={{width:"40px",marginLeft:"10px",marginTop:"18px"}}
                            onClick={()=> handleEdit(item.uniqueLink)}/>
                            <img src={Delete} alt="icon delete" style={{width:"40px",marginLeft:"10px",marginTop:"18px"}} onClick={()=> handleBtnDel(item.id)}/>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
            
            
        </div>
    </div>
  )
}

export default MyLinks