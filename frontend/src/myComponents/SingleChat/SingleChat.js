import "./SingleChat.css";

import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar, CircularProgress, FormControl, IconButton, Input } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { getSender } from "../../config/ChatLogics";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import UpdateGroupChat from "../Misc/UpdateGroupChat/UpdateGroupChat";
import MessageLoading from "../ChatLoading/MessageLoading";
import axios from "axios";
import ScrollableChat from "../ScrollableChat/ScrollableChat";
import io from 'socket.io-client'




const ENDPOINT = "http://localhost:5000";//"https://whatsapp-clone-mern-vibhu.herokuapp.com/";
var socket,selectedChatCompare;

const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
const [chatUser, setchatUser] = useState();
const [messages, setmessages] = useState([]);
const [loading, setloading] = useState(false);
const [newMessage, setNewMessage] = useState();
const [socketConnected, setSocketConnected] = useState(false);
const [typing, setTyping] = useState(false);
const [istyping, setIsTyping] = useState(false);


const fetchMessages = async () => {
  if(!selectedChat) return;

  try {
    const config = {
      headers: {
      
        Authorization: `Bearer ${user.token}`,
      },
    };
    setloading(true);
    const { data } = await axios.get(`/api/message/${selectedChat._id}`,config);
    
    setmessages(data);
    console.log("msgs are apka" +messages);
    setloading(false);
    socket.emit('join chat',selectedChat._id);


  } catch (error) {
    alert('Error Occured While Loading Chats')
  }
};
const sendMessage = async(e) => {
  e.preventDefault();
  socket.emit('stop typing',selectedChat._id)
  if(newMessage){
try {
  const config = {
    headers: {
      "Content-Type" : "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const {data} = await axios.post('/api/message', {
    content : newMessage , 
    chatId : selectedChat._id,
  },config);
socket.emit("new message",data);
setNewMessage("");
setmessages([...messages,data]);

} catch (error) {
  alert('failed to send mssg')
}
  }
  
}

useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup", user);
  socket.on("connection", () => setSocketConnected(true));
}, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  socket.on("typing", () => setIsTyping(true));
   socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //if (!notification.includes(newMessageRecieved)) {
          //setNotification([newMessageRecieved, ...notification]);
          //setFetchAgain(!fetchAgain);
        //}
      } else {
        setmessages([...messages, newMessageRecieved]);
      }
    });
  });

const typingHandler = (e) => {
  setNewMessage(e.target.value);
  //typing indicator
  if(!socketConnected){
    return;
  }

  if(!typing){
    setTyping(true);
    socket.emit('typing',selectedChat._id)
  }
  let lastTypingTime = new Date().getTime();
  var timerLength = 3000;
  setTimeout(() => {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastTypingTime;
    if(timeDiff >=timerLength && typing)
    {
      socket.emit("stop typing",selectedChat._id);
      setTyping(false);
    }
  }, timerLength);
}





  return (
    <>
      {selectedChat ? (
        <>
          {!selectedChat.isGroupChat ? (
            <>
              <>
                <div className="msgpannel_header">
                  <div className="msgpannel_header_profile">
                    <div className="msgpannel_header_profile_pic">
                      <Avatar src={getSender(user, selectedChat.users).pic} />
                    </div>

                    <div className="msgpannel_header_profile_info">
                      <h6>{getSender(user, selectedChat.users).name}</h6>
                      <p>Last Message</p>
                    </div>
                  </div>

                  <div className="msgpannel_header_right">
                    <IconButton>
                      <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <MoreVertOutlinedIcon />
                    </IconButton>
                  </div>
                </div>

                {/* ////////////////////// ChatBOdy start /////////////////////////////*/}

                <div className="msgpannel_chatbox">
                  {loading ? (
                    <>
                      <MessageLoading />
                      <CircularProgress
                        color="success"
                        style={{ marginLeft: "50%", marginTop: "5px" }}
                      />
                    </>
                  ) : (
                    <>
                      {
                        <div>
                          <ScrollableChat messages={messages} />
                        </div>
                      }
                    </>
                  )}
                </div>

                <div className="msgpannel_footer">
                  <IconButton>
                    <InsertEmoticonIcon />
                  </IconButton>

                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>

                  <form className="form">
                    {istyping ? (
                      <div
                        style={{  }}
                      >
                        Typing...
                      </div>
                    ) : (
                      <></>
                    )}
                    <Input
                      type="text"
                      className="input"
                      placeholder="Type a Meassage"
                      onChange={typingHandler}
                      value={newMessage}
                    />

                    <button
                      type="submit"
                      onClick={sendMessage}
                      className="button"
                    >
                      SEND
                    </button>
                  </form>

                  <IconButton>
                    <MicIcon />
                  </IconButton>
                </div>
                {/* ////////////////////// ChatBOdy end /////////////////////////////*/}
              </>
            </>
          ) : (
            <>
              <>
                <div className="msgpannel_header">
                  <div className="msgpannel_header_profile">
                    <div className="msgpannel_header_profile_pic">
                      <Avatar />
                    </div>

                    <div className="msgpannel_header_profile_info">
                      <h6>{selectedChat.chatName}</h6>
                      <p></p>
                    </div>
                  </div>

                  <div className="msgpannel_header_right">
                    <IconButton>
                      <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <MoreVertOutlinedIcon />
                    </IconButton>
                    <UpdateGroupChat
                      fetchAgain={fetchAgain}
                      setfetchAgain={setfetchAgain}
                      fetchMessages={fetchMessages}
                    />
                  </div>
                </div>
                {/* ////////////////////// ChatBOdy start /////////////////////////////*/}

                <div className="msgpannel_chatbox">
                  {loading ? (
                    <>
                      <MessageLoading />
                      <CircularProgress
                        color="success"
                        style={{ marginLeft: "50%", marginTop: "5px" }}
                      />
                    </>
                  ) : (
                    <>
                      {
                        <div>
                          <ScrollableChat messages={messages} />
                        </div>
                      }
                    </>
                  )}
                </div>

                <div className="msgpannel_footer">
                  <IconButton>
                    <InsertEmoticonIcon />
                  </IconButton>

                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>

                  <form className="form">
                    {istyping ? (
                      <div
                        style={{ backgroundColor: "black", marginTop: "0px" }}
                      >
                        Typing...
                      </div>
                    ) : (
                      <></>
                    )}
                    <Input
                      type="text"
                      className="input"
                      placeholder="Type a Meassage"
                      onChange={typingHandler}
                      value={newMessage}
                    />

                    <button
                      type="submit"
                      onClick={sendMessage}
                      className="button"
                    >
                      SEND
                    </button>
                  </form>

                  <IconButton>
                    <MicIcon />
                  </IconButton>
                </div>
                {/* ////////////////////// ChatBOdy end /////////////////////////////*/}
              </>
            </>
          )}
        </>
      ) : (
        <>
          <div className="Initial">
            <h2>Please Select A User To Start Chatting</h2>
          </div>
        </>
      )}
    </>
  );
};

export default SingleChat;
