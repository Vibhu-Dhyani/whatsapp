import './UpdateGroupChat.css'

import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Modal from "@mui/material/Modal";
import { Avatar, CircularProgress, FormControl, IconButton, Input, TextField, Tooltip } from "@mui/material";
import { ChatState } from '../../../Context/ChatProvider';
import UserBadge from '../UserBadge/UserBadge';
import CreateIcon from "@mui/icons-material/Create";
import axios from 'axios';
import UserListItem from '../../UserListItem/UserListItem';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ExitToApp } from '@mui/icons-material';






const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px 0px",
};

const UpdateGroupChat = ({fetchAgain , setfetchAgain , fetchMessages}) => {
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [groupChatName, setgroupChatName] = useState();
const [search, setSearch] = useState();
const [searchResult, setSearchResult] = useState([]);
const [loading, setLoading] = useState(false);
const [renameloading, setrenameloading] = useState(false);

const {setSelectedChat , selectedChat , user} = ChatState();


const handleRemove1 = async(user1) => {
   if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
    alert('Admin Access Needed')
     return;
   }

   try {
     setLoading(true);
     const config = {
       headers: {
         Authorization: `Bearer ${user.token}`,
       },
     };
     const { data } = await axios.put(
       `/api/chat/groupremove`,
       {
         chatId: selectedChat._id,
         userId: user1._id,
       },
       config
     );

     user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
     setfetchAgain(!fetchAgain);
     fetchMessages();
     setLoading(false);
   } catch (error) {
     alert('error while removing the user')
     setLoading(false);
   }
   setgroupChatName("");

}
const handleRename = async() => {
    if(!groupChatName) {
        alert('entervalue')
        return;
    }

    try {
        
        setrenameloading(true);
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`,
            }
        };
        const {data} = await axios.put('/api/chat/rename',{
            chatId : selectedChat._id,
            chatName: groupChatName
        } , config);

        setSelectedChat(data);
        setfetchAgain(!fetchAgain);
        setrenameloading(false);


    } catch (error) {
        alert('Error Occured while updating Name')
        setrenameloading(false);
    }
    setgroupChatName("");
};



const handleSearch = async (query) => {
  setSearch(query);
  if (!query) {
    return;
  }

  try {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/user?search=${search}`, config);
    setLoading(false);
    setSearchResult(data);
    console.log(data);
  } catch (error) {
    alert("Error Occured while Search");
    
  }
};

const handleGroup1 = async(user1) => {

    if (selectedChat.users.find((u) => u._id === user1._id)) {
      alert('user already Exists')
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
 
        alert('Admin Permission Required')
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setfetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert('error while adding user')
      setLoading(false);
    }
    setgroupChatName("");


};


  return (
    <div>
      <IconButton onClick={handleOpen}>
        <GroupAddIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              margin: "-33px",
              width: "515px",
              height: "90px",
              backgroundColor: " #128C7E",
              borderRadius: "20px 0px 0px 0px",
            }}
          ></div>
          <div
            style={{
              fontSize: "35px",
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            <p style={{ color: "white", marginTop: "-30px" }}>
              {selectedChat.chatName}
            </p>
          </div>
          <Box
            style={{
              margin: "20px",
              width: "400px",
              height: "90px",
              overflow: "auto",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "inset 0 0 10px #000000",
            }}
          >
            {selectedChat.users.map((u) => (
              <UserBadge
                key={user._id}
                user={u}
                handleFunction={() => handleRemove1(u)}
              />
            ))}
          </Box>
          <FormControl style={{}}>
            <span style={{ marginLeft: "20px" }}>
              <TextField
                variant="standard"
                style={{
                  width: "370px",
                  textAlign: "center",
                  marginTop: "0px",
                }}
                label="Enter the new chat name"
                onChange={(e) => setgroupChatName(e.target.value)}
              />
              <IconButton onClick={handleRename}>
                {renameloading ? <CircularProgress /> : <CreateIcon />}
              </IconButton>
            </span>
          </FormControl>

          <FormControl style={{}}>
            <span style={{ marginLeft: "20px" }}>
              <TextField
                variant="standard"
                style={{
                  width: "400px",
                  textAlign: "center",
                  marginTop: "0px",
                }}
                label="Add new Users"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </span>
          </FormControl>

          <Box id="over_box">
            {loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((u) => (
                  <UserListItem
                    style={{}}
                    key={u._id}
                    user={u}
                    handleFunction={() => handleGroup1(u)}
                  />
                ))
            )}
          </Box>

          <Tooltip title="Leave the Group">
            <Button
              variant="contained"
              color="error"
              style={{
                marginLeft: "195px",
                marginTop: "20px",
              }}
             onClick={() => handleRemove1(user)}
            >
              <ExitToApp />
            </Button>
          </Tooltip>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateGroupChat