import React, { useState } from 'react'
import SideBar from '../component/sideBar'
import { v4 as uuidv4 } from 'uuid';

import ImgLink from '../media/upload foto.png'
import Template1 from '../media/Phone.png'

import {API} from '../midlewere/api'
import { Alert } from 'react-bootstrap'

const CreateLink = () => {

    const uniqueLink = uuidv4()

    const [message,setMessage]= useState(null)

    const [links,setLinks] = useState([])

    const [addGroup,setAddGroup] =useState({
        image: "",
        title:"",
        description:"",
    })
    const [addLink,setAddLink] =useState({
        imageLink: "",
        title:"",
        url:"",
    })

    const onChangeNewGroup = (e)=>{
        setAddGroup({
            ...addGroup,
            [e.target.name]:
            e.target.type == "file" ? e.target.files : e.target.value
        })
    }

    const onChangeNewLink = (e)=>{
        setAddLink({
            ...addLink,
            [e.target.name]:
            e.target.type == "file" ? e.target.files : e.target.value
        })
    }

    const handleBtnAddLink= () =>{
        setLinks([
            ...links,
            addLink
        ])
        setAddLink({
            imageLink: "",
            title:"",
            url:"",
        })
    }

    const handlePublishLink = async(e)=>{
        try {
            e.preventDefault()

            const config={
                headers: { 
                    "Content-type": "multipart/form-data", 
                    },
            }

            const formDataGroup = new FormData();
            formDataGroup.set("image", addGroup.image[0],addGroup.image[0].name);
            formDataGroup.set("title", addGroup.title);
            formDataGroup.set("description", addGroup.description);
            formDataGroup.set("uniqueLink", uniqueLink.slice(0,8));

            const response = await API.post('/grouplink',formDataGroup,config)
            console.log(response);
            const idGroup = response.data.dataGroup.id

            console.log(addLink);
            for (let index = 0; index < links.length; index++) {
                const formDataLink = new FormData();
                formDataLink.set("imageLink", links[index].imageLink[0],links[index].imageLink[0].name);
                formDataLink.set("title", links[index].title);
                formDataLink.set("url", links[index].url);
                formDataLink.set("idGroup", idGroup );

                const response = await API.post('/link',formDataLink,config)
                console.log(response);  
            }

            if(response.data.status == "success"){
                const alert = <Alert variant='success'>
                    Publish link success
                </Alert>

            setMessage(alert)
            }

        } catch (error) {
            console.log(error);
            const alert = <Alert variant='danger'>
                Publish link failed
            </Alert>

            setMessage(alert)
        }
    }

  return (
    <div style={{display:"flex",height:"100vh"}} className="bg-light">
        <div style={{flex:"15%"}} >
            <SideBar/>
        </div>
        <div style={{flex:"85%"}}>
            <div style={{backgroundColor:"white",height:"9vh"}}>
                <h6 className='py-3 ms-5'>Template</h6>
            </div>
            <div className='d-flex justify-content-between align-items-center' style={{marginTop:"32px",height:"9vh"}}>
                <div>
                    <h6 className='py-3 ms-5'>Create Link</h6>
                </div>
                <div>
                    <button className='colorOrange py-1 px-3 fw-bold border-0 rounded me-5' style={{color:"white"}}
                    onClick={handlePublishLink}>Publish Link</button>
                </div>
            </div>
            {message}
            <div className='d-flex px-5' style={{height:"82vh"}}>
            
                <div className='scroll p-4  rounded' style={{widt:"100%",height:"70vh",overflow:"scroll",background:"white",flex:"60%"}}>
                    {addGroup.image?<img src={URL.createObjectURL(addGroup.image[0])} alt="foto Link" style={{width:"100px"}}/>:<img src={ImgLink} style={{width:"100px"}} />}                   
                    <label className='colorOrange border-0 rounded py-1 px-3 ms-5 text-light fw-bold'>
                        Upload
                        <input type="file" hidden name="image" onChange={onChangeNewGroup}/>
                    </label>
                    <div className=''>
                        <label style={{width:"100%",marginTop:"30px"}} className="searchInput">
                            Title
                            <input name='title' placeholder='ex. Your Title' type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none"}}
                            onChange={onChangeNewGroup}/>
                        </label>   
                        <label style={{width:"100%",marginTop:"30px",marginBottom:"80px"}} className="searchInput">
                            Description
                            <input name='description' placeholder='ex. Description' type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none"}}
                            onChange={onChangeNewGroup}/>
                        </label>  
                        
                        {links.map((item,index)=>{
                            return(
                                <div key={index} className='mb-4 rounded d-flex p-3' style={{background:"#ececec"}}>
                                    <div>
                                        <img src={URL.createObjectURL(item.imageLink[0])} style={{width:"90px"}} alt="foto link"/>
                                    </div>
                                    <div className='ms-4'>
                                    <label style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} className="searchInput">
                                        Title Link
                                        <input defaultValue={item.title} type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px",fontSize:"20px",fontWeight:"bold"}}/>
                                    </label> 
                                    <label style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} className="searchInput">
                                        Link
                                        <input defaultValue={item.url} type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px",fontSize:"20px",fontWeight:"bold"}}/>
                                    </label> 
                                    </div>
                                </div>
                            )
                        })}

                                <div  className='mb-4 rounded d-flex p-3' >
                                    <div>
                                        <label className="searchInput">
                                            {addLink.imageLink?<img style={{width:"100px"}} src={URL.createObjectURL(addLink.imageLink[0])} alt="foto link"/>:<img src={ImgLink} style={{width:"100px"}} alt="foto link"/>}                                            
                                            <input hidden name='imageLink'  type="file" onChange={onChangeNewLink}/>
                                        </label>
                                    </div>
                                    <div className='ms-4'>
                                    <label className="searchInput" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}}>
                                        Title Link
                                        <input  type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px"}} name="title" onChange={onChangeNewLink} />
                                    </label>  
                                    <label className="searchInput" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}}>
                                        Link
                                        <input  type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px"}} name="url" onChange={onChangeNewLink}  />
                                    </label> 
                                    </div>
                                </div>

                        <button className='w-100 colorOrange border-0 rounded py-2 text-light fw-bold' onClick={handleBtnAddLink}>Add New Link</button>
                        
                    </div>
                </div>
                <div style={{flex:"40%"}} className="d-flex justify-content-center">
                    <img src={Template1} alt="template" style={{margin:"auto"}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateLink