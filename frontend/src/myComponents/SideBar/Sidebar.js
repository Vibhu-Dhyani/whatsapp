import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Input,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material//DonutLarge";
import ChatIcon from "@mui/icons-material//Chat";
import MoreVertIcon from "@mui/icons-material//MoreVert";
import SearchOutlinedIcon from "@mui/icons-material//SearchOutlined";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Box } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import ChatLoading from "../ChatLoading/ChatLoading";

import { getSender } from "../../config/ChatLogics";
import SidePannel from "../Misc/SidePannel.js/SidePannel";
import { useHistory } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GroupsIcon from "@mui/icons-material/Groups";
import ModalGroupChat from "../Misc/ModalGroupChat/ModalGroupChat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "#ededed",
  border: "1px solid #000",
  boxShadow: 24,

  borderRadius: "20px 0px",
};

const Sidebar = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      alert("Error Occured ! Failed to load the chats");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Tooltip title={`View profile of ${user.name}`} placement="right">
          <IconButton onClick={handleOpen}>
            <Avatar id="avatar" src={user.pic} />
          </IconButton>
        </Tooltip>

        {/*start modal*/}

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
                  width: "100%",
                  height: "90px",
                  backgroundColor: " #128C7E",
                  borderRadius: "20px 0px 0px 0px",
                }}
              >
                <Box alignContent="center">
                  <IconButton style={{ marginLeft: "29%" }}>
                    <Avatar
                      src={user.pic}
                      sx={{ width: 200, height: 200 }}
                      style={{
                        marginLeft: "0%",
                      }}
                    />
                  </IconButton>

                  <b>
                    <h3 style={{ textAlign: "center", marginTop: "-1px" }}>
                      @{user.name}
                    </h3>
                  </b>

                  <h5 style={{ textAlign: "center" }}>{user.email}</h5>
                </Box>
              </div>
            </Box>
          </Fade>
        </Modal>

        {/*end modal*/}

        <div className="sidebar_header_right">
          <ModalGroupChat />

          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <Tooltip title={"More Options"} placement="top">
            <IconButton>
              <MoreVertIcon onClick={handleClick} />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleOpen}>Profile</MenuItem>

            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <input placeholder="Type to Search" type="text" />
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_chat">
        <div className="sidebar_chat_detail">
          {chats ? (
            <Stack>
              {chats.map((chat) => (
                <SidePannel
                  className="chatDetail"
                  chat={chat}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
