import React, { useState } from "react";
import { Avatar, Button, CircularProgress, IconButton, Input, TextField } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./SideDrawer.css";
import { makeStyles } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { ChatState } from "../../../Context/ChatProvider";
import ChatLoading from "../../ChatLoading/ChatLoading";
import { SwitchAccessShortcutAddTwoTone } from "@mui/icons-material";
import UserListItem from "../../UserListItem/UserListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "#ededed",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px 0px",
};

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadinChat] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user , setSelectedChat,chats,setChats} = ChatState();

  const handleSearch = async () => {
    if (!search) {
      alert("Enter the userId or email");
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
    } catch (error) {
      alert("error occured , Failed to load data");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadinChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if(!chats.find((c)=> c._id === data._id) ) 
      {setChats([data,...chats]);}


      setSelectedChat(data);
      setLoadinChat(false);
      handleClose();
    } catch (error) {
      alert("Error fetching chats");
      setLoadinChat(false);
    }
  };


  return (
    <>
      <Box>
        <div id="add_Icon">
          <Tooltip title="Click to add a chat">
            <Button onClick={handleOpen}>
              <IconButton>
                <ChatIcon
                  fontSize="large"
                  style={{ fontSize: "60px", color: "#128C7E" }}
                />
              </IconButton>
            </Button>
          </Tooltip>
        </div>

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
              <h3 style={{ textAlign: "center", fontFamily: "Work Sans" }}>
                Search Users
              </h3>
              <Box id="search_box">
                <TextField
                  variant="standard"
                  label="Enter user / email"
                  style={{ width: "100%", textAlign: "center" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton style={{ fontSize: "20px" }}>
                  <Button onClick={handleSearch} style={{ fontSize: "20px" }}>
                    <SearchOutlinedIcon
                      style={{ fontSize: "20px" }}
                    ></SearchOutlinedIcon>
                  </Button>
                </IconButton>
              </Box>
              <Box id="over_box">
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                      loadingChat={loadingChat}
                    />
                  ))
                )}
                {loadingChat && (
                  <CircularProgress
                    color="success"
                    style={{ marginTop: "50px", marginLeft: "45%" }}
                  />
                )}
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
};

export default SideDrawer;
