import React from 'react'

import ImgProfile from '../media/beach.jpg'
import FbIcon from '../media/fb.jpg'
import IgIcon from '../media/ig.jpg'

const DisplayLinks = () => {
  return (
    <div className='mt-5' style={{margin:"auto",width:"35%"}}>
        <div>
            <div className='d-flex justify-content-center mb-2'>
                <img src={ImgProfile} alt="profile" style={{width:"90px",height:"90px",borderRadius:"90px",alignItems:"center"}}/>
            </div>
            <h3 className='text-center'>Your Brand Name</h3>
            <p className='text-center'>Add multyple links for your instagram bio and optimising your instagram traffic by using instaBio</p>
        </div>       
        <div className='bg-black py-2 px-4 mb-3'>
            <div className='d-flex align-items-center'>
                <img src={FbIcon} alt="foto link" style={{width:"50px",borderRadius:"50px"}}/>
                <div className='w-100'>
                    <h5 className='text-white text-center'>Facebook</h5>
                </div>
            </div>
        </div>
        <div className='bg-black py-2 px-4 mb-3'>
            <div className='d-flex align-items-center'>
                <img src={IgIcon} alt="foto link" style={{width:"50px",borderRadius:"50px"}}/>
                <div className='w-100'>
                    <h5 className='text-white text-center'>Instagram</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DisplayLinks