import "./ModalGroupChat";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import Fade from "@mui/material/Fade";

import React, { useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../../UserListItem/UserListItem";
import UserBadge from "../UserBadge/UserBadge";

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

const ModalGroupChat = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
const handleSearch = async (query) => {

    setSearch(query);
    if(!query){
        return;
    }

    try {
        setLoading(true);
        const config = {
            headers: {
                Authorization : `Bearer ${user.token}`,
            }
        }
        const { data } = await  axios.get(`/api/user?search=${search}` , config);
        setLoading(false);
        setSearchResult(data);
        console.log(data);
    } catch (error) {
        alert('Error Occured while Search');
    }

}
const handleSubmit = async() => {

    if(!groupChatName || !selectedUsers)
    {
        alert('Input Invalid')
        return;
    }

    try{

         const config = {
           headers: {
             Authorization: `Bearer ${user.token}`,
           },
         };

         const {data} = await axios.post('/api/chat/group' , {
             name : groupChatName,
             users : JSON.stringify(selectedUsers.map((u)=> u._id))
         }, config);

         setChats([data,...chats]);
         handleClose();
         alert('new group chat created');


    }catch(error){

        alert('error occured while creating groupchat')
    }


}
const handleGroup = (userToAdd) => {
if(selectedUsers.includes(userToAdd)){
    alert('User Already Added')
    return;
}

 setSelectedUsers([...selectedUsers, userToAdd]);

}

const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel)=> sel._id !== delUser._id));

}

  return (
    <>
      <Tooltip title={"Create a Group Chat"} placement="top">
        <IconButton>
          <GroupsIcon onClick={handleOpen} />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
                Create Group Chat
              </p>
            </div>
            <div
              className="body"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FormControl>
                <TextField
                  variant="standard"
                  style={{
                    width: "400px",
                    textAlign: "center",
                  }}
                  label="Enter the chat name"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  variant="standard"
                  style={{
                    width: "400px",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                  label="Search User"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              <Box style  = {{
                  margin:"20px",
                  width:"400px",
                  height:"90px",
                  overflow:"auto",
                  backgroundColor:"white",
                  borderRadius:"10px",
                  boxShadow:         "inset 0 0 10px #000000"
              }}>
                {selectedUsers.map((u) => (
                  <UserBadge
                    key={user._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
              <Box id="over_box" >
                {loading ? (
                  <div>
                    <CircularProgress />
                  </div>
                ) : (
                  searchResult
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        style={{}}
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                )}
              </Box>
              <Button
                color="success"
                style={{ marginTop: "20px" }}
                onClick={handleSubmit}
              >
                Create Group Chat
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalGroupChat;
