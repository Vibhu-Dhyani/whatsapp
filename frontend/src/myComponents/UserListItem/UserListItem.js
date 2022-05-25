import './UserListItem.css'


import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@mui/system';
import { Avatar, CircularProgress } from '@mui/material';

const UserListItem = ({ user, handleFunction ,loadingChat}) => {

    console.log("vibhu :->" +user.pic)



  return (
    <>
      <Box id="wrap" onClick={handleFunction}>
        <Avatar src={user.pic} />
        <Box id="chatdetailinfo">
          <span>
            <h4>{user.name}</h4>
            <p style={{ fontSize: "12px" }}>
              <b>Email : </b>
              {user.email}
            </p>
          </span>
         
        </Box>
      </Box>
    </>
  );
}

export default UserListItem