import React from 'react'

import SideBar from '../component/sideBar'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Profile = () => {
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
                    <Box 
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    style={{marginBottom:"50px"}}>
                        <TextField id="standard-basic" label="Name" variant="standard" />
                    </Box>
                    <Box sx={{
                            '& > :not(style)': { m: 1, width: '100ch' },
                        }}>
                        <TextField id="standard-basic-adorment" label="Email" variant="standard" />
                    </Box>  
                </div>
            </div>
            <div className='d-flex justify-content-end mt-5' style={{width:"90%",margin:"auto"}}>
                <button className='colorOrange border-0 rounded px-3 py-1 fw-bold' style={{color:"white"}}>
                    Save Account
                </button>
                <button  className='ms-4 border-0 rounded px-3 py-1 fw-bold' style={{background:"red",color:"white"}}>
                    Delete Account
                </button>
            </div>
        </div>
    </div>
  )
}

export default Profile