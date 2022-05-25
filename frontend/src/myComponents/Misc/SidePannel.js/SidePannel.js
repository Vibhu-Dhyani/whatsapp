import "./SidePannel.css";

import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import ChatLoading from "../../ChatLoading/ChatLoading";

import { getSender } from "../../../config/ChatLogics";
import { ChatState } from "../../../Context/ChatProvider";
const st1 = {
  backgroundColor: "#e0e0e0",
};
const st2 = {
  backgroundColor: "#ededed",
};

const SidePannel = ({
  chat,
  loggedUser,
  setLoggedUser,
  selectedChat,
  setSelectedChat,
}) => {
  console.log(chat);
  const [chatUser, setchatUser] = useState();
  const [groupDetail, setgroupDetail] = useState();
  const { user } = ChatState();
  setLoggedUser(user);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="chatDetail"
      onClick={() => setSelectedChat(chat)}
      style={
        (selectedChat === chat ? st1 : 
        {
          "&:hover": {
          }
        }
        
        )
      }
    >
      {console.log("chat is " )}
      <div className="chatDetail_information">
        <Avatar src={getSender(loggedUser, chat.users).pic} />
        <span className="chatDetail_lastinfo">
          <h6>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users).name
              : chat.chatName}
          </h6>
        </span>
      </div>
      <p id="rcorners1">
        <span class="hidden pull-right">&#9660;</span>
      </p>
    </div>
  );
};

export default SidePannel;
