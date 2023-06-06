import React, { useRef, useState } from "react";
import ChatBox from "../../components/Chat/ChatBox";
import Conversation from "../../components/Chat/Conversation";
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequest/CHatRequest";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Navbar from "../NavBar/NavBar";
import { Box } from "@mui/material";

const Chat = () => {
  // const dispatch = useDispatch();
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // Send Message to socket server

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      
      setOnlineUsers(users);
    });
  
    socket.current.on("receive-message", (data) => {

      setReceiveMessage(data);
    });
  
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user,receiveMessage]);
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
 

  // Get the message from socket server

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        console.log(user._id);
        const data = await userChats(token, user._id);
        setChats(data.chats);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <Navbar />

      <div className='Chat' style={{ marginTop: "6rem" }}>
        {/* <Box m='2rem 0' /> */}

        {/* Left Side */}
        <div className='Left-side-chat'>
        
          <div className='Chat-container'>
            <h2>Chats</h2>
            <div className='Chat-list'>
              {chats.map((chat) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className='Right-side-chat'>
         

          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receiveMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
