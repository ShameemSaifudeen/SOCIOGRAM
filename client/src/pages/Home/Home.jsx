import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../NavBar/NavBar";
import UserWidget from "../Widgets/UserWidgets";
import MyPostWidget from "../Widgets/MyPost";
import PostsWidget from "../Widgets/PostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "../Widgets/FriendList";
import { useEffect } from "react";
import { useState } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, displayPicture } = useSelector((state) => state.user);
  const [click,setClick] = useState(false)
  const handleClick = () =>{
    setClick(!click)
  }
useEffect(()=>{

},[click])
  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='7rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box  height="fit-content"
          position="sticky"
          top="7rem" flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
        >
          <MyPostWidget picturePath={displayPicture} handleClick={handleClick} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box
            flexBasis='26%'
          
          >
            {/* can place another widget here */}
            <FriendListWidget userId={_id} />

            <Box m='2rem 0' />
            <FriendListWidget userId={_id} isFollowingList={true} />

            <Box m='2rem 0' />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
