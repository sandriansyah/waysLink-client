import React from 'react'
import SideBar from '../component/sideBar'

import ImgLink from '../media/Rectangle 11.png'
import Template1 from '../media/Phone.png'

const CreateLink = () => {

    const socialMedia = [
        {
            image:"",
            title:"Facebook",
            link:"http://www.facebook.com"
        },
        {
            image:"",
            title:"Twitter",
            link:"http://www.twitter.com"
        },
        {
            image:"",
            title:"Instagram",
            link:"http://www.instagram.com"
        },
    ]

  return (
    <div style={{height:"100vh",display:"flex"}} className="bg-light">
        <div style={{flex:"15%"}} >
            <SideBar/>
        </div>
        <div style={{flex:"85%"}}>
            <div style={{backgroundColor:"white"}}>
                <h6 className='py-3 ms-5'>Template</h6>
            </div>
            <div className='d-flex justify-content-between align-items-center' style={{marginTop:"32px"}}>
                <div>
                    <h6 className='py-3 ms-5'>Create Link</h6>
                </div>
                <div>
                    <button className='colorOrange py-1 px-3 fw-bold border-0 rounded me-5' style={{color:"white"}}>Publish Link</button>
                </div>
            </div>
            <div className='d-flex px-5' style={{height:"80vh"}}>
                <div className='scroll p-4 my-4 rounded' style={{widt:"100%",overflow:"scroll",background:"white",flex:"60%"}}>
                    <img src={ImgLink} alt="foto Link"/>
                    <button className='colorOrange border-0 rounded py-1 px-3 ms-5'>Upload</button>
                    <div className=''>
                        <label style={{width:"100%",marginTop:"30px"}}>
                            Title
                            <input placeholder='ex. Your Title' type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none"}}/>
                        </label>   
                        <label style={{width:"100%",marginTop:"30px",marginBottom:"80px"}}>
                            Description
                            <input placeholder='ex. Description' type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none"}}/>
                        </label>  
                        
                        {socialMedia.map((item)=>{
                            return(
                                <div className='mb-4 rounded d-flex p-3' style={{background:"#ececec"}}>
                                    <div>
                                        <img src={ImgLink} alt="foto link"/>
                                    </div>
                                    <div className='ms-4'>
                                    <label style={{width:"100%",marginTop:"10px",marginBottom:"30px"}}>
                                        Title Link
                                        <input value={item.title} type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"30px"}}/>
                                    </label> 
                                    <label style={{width:"100%",marginTop:"10px",marginBottom:"30px"}}>
                                        Link
                                        <input value={item.link} type="text" style={{width:"100%",borderTop:"none",borderLeft:"none",borderRight:"none",background:"none",marginTop:"30px"}}/>
                                    </label> 
                                    </div>
                                </div>
                            )
                        })}

                        <button className='w-100 colorOrange border-0 rounded py-2 text-light fw-bold'>Add New Link</button>
                        
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