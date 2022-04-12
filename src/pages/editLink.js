import React, { useEffect, useState } from 'react'
import SideBar from '../component/sideBar'

import {useParams} from 'react-router-dom'

import ImgLink from '../media/upload foto.png'
import Template1 from '../media/Phone.png'

import {API} from '../midlewere/api'
import { Alert } from 'react-bootstrap'

const CreateLink = () => {

    const [message,setMessage]= useState(null)

    const [links,setLinks] = useState([])
    
    const [addLink,setAddLink] =useState({
        imageLink: "",
        title:"",
        url:"",
    })

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
    }


    // ........................edit................................................

    const {id} = useParams()
    const [dataGroup,setDataGroup] = useState([])
    const [editGroup,setEditGroup] =useState({
        image: dataGroup?.image,
        title:dataGroup?.title,
        description:dataGroup?.description,
    })
    const [dataLinks,setDataLinks] = useState([])
    console.log(dataLinks);
    
    useEffect(()=>{
        getGroup()
        // getLinks()
    },[])

    useEffect(()=>{
        if(dataGroup){
            getLinks()
        }
    },[dataGroup,links])

    const onChangeNewGroup = (e)=>{
        setEditGroup({
            ...editGroup,
            [e.target.name]:
            e.target.type == "file" ? e.target.files : e.target.value
        })
    }

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

    const handleInputChange = (e,item,index) => {
        const { name, value } = e.target;
        const list = [...dataLinks];

        console.log(list);
    
        // it's an array element, not a keyed map/object, 
        // so have to recreate the entire element
        // list[index] = {
        //     ...list[index], 
        //     [e.target.name] : value };
        list[index] = {
            ...list[index], 
            [e.target.name]:
            e.target.type == "file" ? e.target.files : e.target.value };
        
        setDataLinks(list);
      };

      const handlePublishLink = async(e)=>{
        try {
            e.preventDefault()

            const config={
                headers: { 
                    "Content-type": "multipart/form-data",
                    // "Content-type":"application/json",
                    },
            }
            
            const formDataGroup = new FormData();
            formDataGroup.set("image", editGroup.image[0],editGroup.image[0].name);
            formDataGroup.set("title", editGroup.title);
            formDataGroup.set("description", editGroup.description);

            const response = await API.patch(`/grouplink/${dataGroup.id}`,formDataGroup,config)
            
            const idGroup = response.data.finding.id

            console.log(dataLinks);
            for (let index = 0; index < dataLinks.length; index++) {
                console.log(dataLinks[index]);
                const formDataLink = new FormData();
                formDataLink.set("imageLink", dataLinks[index].imageLink[0],dataLinks[index].imageLink[0].name);
                formDataLink.set("title", dataLinks[index].title);
                formDataLink.set("url", dataLinks[index].url);
                formDataLink.set("idGroup", idGroup );

                // const dataLinkEdit = {
                //     imageLink: dataLinks[index].imageLink,
                //     title:dataLinks[index].title,
                //     url:dataLinks[index].url,
                // }
                // console.log(dataLinkEdit);

                // const body = JSON.stringify(dataLinkEdit)
                // console.log(body);

                console.log(dataLinks[index].id)

                const response = await API.patch(`/link/${dataLinks[index].id}`,formDataLink,config)
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
            // const alert = <Alert variant='danger'>
            //     Publish link failed
            // </Alert>

            // setMessage(alert)
        }
    }

    // const handleLink = async(e)=>{
    //     try {
    //         e.preventDefault()

    //         const config={
    //             headers: { 
    //                 // "Content-type": "multipart/form-data",
    //                 "Content-type":"application/json",
    //                 },
    //         }
            
    //         const formDataGroup = new FormData();
    //         formDataGroup.set("image", editGroup.image[0],editGroup.image[0].name);
    //         formDataGroup.set("title", editGroup.title);
    //         formDataGroup.set("description", editGroup.description);

    //         const response = await API.patch(`/grouplink/${dataGroup.id}`,formDataGroup,config)
            
    //         const idGroup = response.data.finding.id

    //         console.log(dataLinks);
    //         for (let index = 0; index < dataLinks.length; index++) {
    //             console.log(dataLinks[index]);
    //             // const formDataLink = new FormData();
    //             // formDataLink.set("imageLink", dataLinks[index].imageLink[0],dataLinks[index].imageLink[0].name);
    //             // formDataLink.set("title", dataLinks[index].title);
    //             // formDataLink.set("url", dataLinks[index].url);
    //             // formDataLink.set("idGroup", idGroup );

    //             const dataLinkEdit = {
    //                 imageLink: dataLinks[index].imageLink,
    //                 title:dataLinks[index].title,
    //                 url:dataLinks[index].url,
    //             }
    //             console.log(dataLinkEdit);

    //             const body = JSON.stringify(dataLinkEdit)
    //             console.log(body);

    //             const response = await API.patch(`/link/${dataLinks[index].id}`,body,config)
    //             console.log(response);  
    //         }

    //         if(response.data.status == "success"){
    //             const alert = <Alert variant='success'>
    //                 Publish link success
    //             </Alert>

    //         setMessage(alert)
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         const alert = <Alert variant='danger'>
    //             Publish link failed
    //         </Alert>

    //         setMessage(alert)
    //     }
    // }


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
                    {editGroup.image? <img src={URL.createObjectURL(editGroup.image[0])} style={{width:"100px"}} /> : <img src={dataGroup.image} style={{width:"100px"}} />}
                    <label className='colorOrange border-0 rounded py-1 px-3 ms-5 text-light fw-bold'>
                        Upload
                        <input type="file" hidden name="image" onChange={onChangeNewGroup}/>
                    </label>
                    <div className=''>
                        <label style={{width:"100%",marginTop:"30px"}} className="searchInput">
                            Title
                            <input name='title' placeholder='ex. Your Title' type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",fontWeight:"bold",fontSize:"20px"}}
                            onChange={onChangeNewGroup} defaultValue={dataGroup.title}/>
                        </label>   
                        <label style={{width:"100%",marginTop:"30px",marginBottom:"80px"}} className="searchInput">
                            Description
                            <input name='description' placeholder='ex. Description' type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",fontWeight:"bold",fontSize:"20px"}}
                            onChange={onChangeNewGroup} defaultValue={dataGroup.description}/>
                        </label>  
                        
                        {dataLinks.map((item,index)=>{
                            
                            return(
                                <div key={item.id} style={{background:"#ececec"}} >
                                    <div className='d-flex justify-content-end'>
                                    </div>
                                    <div className='mb-4 rounded d-flex p-3' >
                                        <div>
                                            <label>
                                                <img src={`http://localhost:5000/uploads/${item.imageLink}`} style={{width:"90px"}} alt="foto link"/>
                                                <input hidden type="file" name="imageLink"
                                                onChange={(e) => handleInputChange(e, item, index)} />
                                            </label>
                                        </div>
                                        <div className='ms-4'>
                                            <label style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} className="searchInput">
                                                Title Link
                                                <input name='title' defaultValue={item.title} type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px",fontSize:"20px",fontWeight:"bold"}}
                                                onChange={(e) => handleInputChange(e, item, index)}/>
                                            </label> 
                                            <label style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} className="searchInput">
                                                Link
                                                <input name='url' defaultValue={item.url} type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px",fontSize:"20px",fontWeight:"bold"}} 
                                                onChange={(e) => handleInputChange(e, item,index)}/>
                                            </label> 
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                                <div  className='mb-4 rounded d-flex p-3' >
                                    <div>
                                        <label className="searchInput">
                                            {addLink.imageLink?<img style={{width:"100px"}} src={ImgLink} alt="foto link"/>:<img src={ImgLink} style={{width:"100px"}} alt="foto link"/>}                                            
                                            <input hidden name='imageLink'  type="file" onChange={onChangeNewLink}/>
                                        </label>
                                    </div>
                                    <div className='ms-4'>
                                    <label className="searchInput" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}}>
                                        Title Link
                                        <input  type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px"}} name="title"  />
                                    </label>  
                                    <label className="searchInput" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}}>
                                        Link
                                        <input  type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"10px"}} name="url"  />
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