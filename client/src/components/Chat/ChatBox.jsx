/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useRef } from "react";
// import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/userApi/userApi";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import {
  addMessage,
  getMessages,
} from "../../api/MessageRequest/MessageRequest";
import UserImage from "../UserImage/UserImage";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = useSelector((state) => state.token);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    
    
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      
      setMessages([...messages, receivedMessage]);
    }
  },[receivedMessage] );

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const data = await getUser(userId, token);
        
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        
        const data = await getMessages(token, chat._id);
        
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);
  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }

    const message = {
      senderId: currentUser,
      message: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const data = await addMessage(token, message);
      
      setMessages([...messages, data.messages]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };
  

  // Receive Message from parent component

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className='ChatBox-container' style={{height:"76vh"}}>
        {chat ? (
          <>
            <div className='chat-header'>
              <div className='follower'>
                <div>
                  <UserImage image={userData?.displayPicture} size='55px' />
                  {/* <img
                    src={
                      userData?.displayPicture
                        ? `http://localhost:5000/uploads/${userData.displayPicture}`
                        : "/assets/150-1503945_transparent-user-png-default-user-image-png-png (1).png"
                    }
                    alt='Profile'
                    className='followerImage'
                    style={{ width: "50px", height: "50px" }}
                  /> */}
                  <div className='name' style={{ fontSize: "0.8rem" }}>
                    <span>{userData?.userName}</span>
                  </div>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            </div>
            <div className='chat-body'>
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.message}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            <div className='chat-sender'>
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div  className={`send-button button ${
                !newMessage.trim() ? "disabled" : ""
              }`}
              disabled={!newMessage.trim()}
              onClick={handleSend}>
                Send
              </div>
            </div>{" "}
          </>
        ) : (
          <span className='chatbox-empty-message'>Tap a chat to start</span>
        )}
        {/* chat-header */}
      </div>
    </>
  );
};

export default ChatBox;
