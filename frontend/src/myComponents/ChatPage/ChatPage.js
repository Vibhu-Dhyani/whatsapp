import { Box } from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import MsgPannel from "../MsgPannel/MsgPannel";
import Sidebar from "../SideBar/Sidebar";
import React, { useEffect } from "react";
import './ChatPage.css'
import SideDrawer from "../Misc/SideDrawer/SideDrawer";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const ChatPage = () => {
  const { user } = ChatState();
const [fetchAgain, setfetchAgain] = useState(false);
const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <div className="wrap">
      <Box className="app_body">
        {true && <Sidebar fetchAgain={fetchAgain} />}
        {true && (
          <MsgPannel fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </Box>
      {true && <SideDrawer />}
    </div>
  );
};

export default ChatPage;
