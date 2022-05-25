import "./ScrollableChat.css";

import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { isSameSender ,isLastMessage, isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
import { Avatar, Tooltip } from "@mui/material";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name}>
                <Avatar
                  mt="7px"
                  mr={1}
                  sx={{ width: 24, height: 24 }}
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#dcf8c6" : "white"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 5 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                 boxShadow: "0px 10px 20px 0px rgba(110, 110, 110, 0.9)"
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </>
  );
};

export default ScrollableChat;
