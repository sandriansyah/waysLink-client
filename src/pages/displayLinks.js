import React, { useEffect, useState } from 'react'

import {useNavigate, useParams,Link} from 'react-router-dom'

import ImgProfile from '../media/beach.jpg'
import FbIcon from '../media/fb.jpg'
import IgIcon from '../media/ig.jpg'
import { API } from '../midlewere/api'

const DisplayLinks = () => {

    const navigate = useNavigate()

    const {id} = useParams()
    const [dataGroup,setDataGroup]=useState([])
    const [dataLinks,setDataLinks]=useState([])

    

    const getGroup = async()=>{
        try {
            const response = await API.get(`/grouplink/${id}`)
            setDataGroup(response.data.getData)
        } catch (error) {
            console.log(error);
        }
    }
    const getLinks = async()=>{
        try {
            const response = await API.get(`/links/${dataGroup.id}`)
            setDataLinks(response.data.dataAdd)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getGroup()
        // getLinks()
    },[])

    useEffect(()=>{
        if(dataGroup){
            getLinks()
        }
    },[dataGroup])

    const handleViewCount = async()=>{
        try {
            console.log(dataGroup.id);
            const response = await API.patch(`/viewAcount/${dataGroup.id}`)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='mt-5' style={{margin:"auto",width:"35%"}}>
        <div>
            <div className='d-flex justify-content-center mb-2'>
                <img src={dataGroup.image} alt="profile" style={{width:"90px",height:"90px",borderRadius:"90px",alignItems:"center"}}/>
            </div>
            <h3 className='text-center'>{dataGroup.title}</h3>
            <p className='text-center'>{dataGroup.description}</p>
        </div>       

        {dataLinks.map((item)=>{
            return(
                
                <div key={item.id} className='bg-black py-2 px-4 mb-3' style={{cursor:"pointer"}} >
                    <div className='d-flex align-items-center' >
                        <img src={`http://localhost:5000/uploads/${item.imageLink}`} alt="foto link" style={{width:"50px",borderRadius:"50px"}} />
                        <div className='w-100'>
                        <a onClick={handleViewCount} target="blank" style={{textDecoration:"none"}} href={item.url}> <h5 className='text-white text-center'>{item.title}</h5> </a>
                        </div>
                    </div>
                </div>               
            )
        })}
        
    </div>
  )
}

export default DisplayLinks