import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../NavBar/NavBar";
import UserWidget from "../Widgets/UserWidgets";
import MyPostWidget from "../Widgets/MyPost";
import PostsWidget from "../Widgets/PostsWidget";
import FriendListWidget from "../Widgets/FriendList";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, displayPicture } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const [click,setClick] = useState(false)
  const handleClick = () =>{
    setClick(!click)
  }
useEffect(()=>{

},[click])

const socket = io("ws://api.sociograam.online")
useEffect(()=>{
 socket?.emit("new-user-add",user._id)

},[socket,user])




  return (
    <Box>
      <Navbar socket={socket}/>
      <Box
        width='100%'
        padding='7rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box  height="fit-content"
          position={isNonMobileScreens ? "sticky" : "static"}
          top="7rem" flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
        >
          <MyPostWidget picturePath={displayPicture} handleClick={handleClick} />
          <PostsWidget click={click} userId={_id} socket={socket} />
        </Box>
        {isNonMobileScreens && (
          <Box
            flexBasis='26%'
          
          >
            <FriendListWidget userId={_id} handleClick={handleClick}/>

            <Box m='2rem 0' />
            <FriendListWidget userId={_id} isFollowingList={true} handleClick={handleClick} />

            <Box m='2rem 0' />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
