import React from 'react'
import './MsgPannel.css'
import {ChatState} from '../../Context/ChatProvider'
import Box from "@mui/material/Box";
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SingleChat from '../SingleChat/SingleChat';

const MsgPannel = ({ fetchAgain, setfetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box className="msgpannel">
      <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>
    </Box>
  );
};

export default MsgPannel