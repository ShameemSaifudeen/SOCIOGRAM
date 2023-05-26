import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import FriendListWidget from "../Widgets/FriendList";
import MyPostWidget from "../Widgets/MyPost";
import PostsWidget from "../Widgets/PostsWidget";
import UserWidget from "../Widgets/UserWidgets";
import { getUser } from "../../api/userApi/userApi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  console.log(userId, "LLLLLL");
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getuser = async () => {
    const response = await getUser(userId, token);
    console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    setUser(response);
  };

  useEffect(() => {
    getuser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding="7rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} userData={user} picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
