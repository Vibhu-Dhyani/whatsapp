import './UserBadge.css'

import React from 'react'
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
const UserBadge = ({user , handleFunction}) => {
    console.log("called1123")
  return (
    <Box
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        margin: "5px",
        padding: "5px",
        color: "white",
        fontSize: "15px",
        fontWeight: "bolder",
        width: "fit-content",
        float: "left",
      }}
    >
      {console.log("called")}
      <span>
        {user.name}
        
          <CloseIcon fontSize="5px" onClick={handleFunction} 
          style={{
              cursor:"pointer"
          }}/>
        
      </span>
    </Box>
  );
}

export default UserBadge