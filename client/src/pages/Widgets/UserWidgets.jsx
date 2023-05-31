/* eslint-disable react/prop-types */
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "../../components/UserImage/UserImage";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import AccountEditModal from "../../components/Modal/AccountEditModal";
import { followReq } from "../../api/userApi/userApi";
import { setFollowers, setFollowing, setUpdateFriendFollowers } from "../../state/slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const UserWidget = ({ userId, userData, isProfile = false,handleEffect}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.user.following);
  const isFollowing = following.find((following) => following._id === userId);
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleFollow = async () => {
    const response = await followReq(user._id, userData._id, token);
    dispatch(setFollowers({ followers: response.followers }));
    dispatch(setFollowing({ following: response.following }));
    dispatch(setUpdateFriendFollowers(user._id))
    handleEffect()
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap='0.5rem' pb='1.1rem'>
        <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${userId}`)}>
          <UserImage
            image={userData ? userData.displayPicture : user.displayPicture}
          />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {userData ? userData.name : user.name}
            </Typography>
            <Typography color={medium}>
              {userData ? userData.userName : user.userName}
            </Typography>
          </Box>
        </FlexBetween>
        {isProfile && userId !== user._id && (
          <Button variant='outlined' onClick={handleFollow}>
            {isFollowing ? "UnFollow" : "Follow"}
          </Button>
        )}
        {userId == user._id && (
          <ManageAccountsOutlined
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
            onClick={handleOpenModal}
          />
        )}
      </FlexBetween>

      {/* modal */}
      <AccountEditModal
        open={openModal}
        onClose={handleCloseModal}
        userData={user}
      />
      <Divider />

      {/* SECOND ROW */}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>Kollam</Typography>
          {/* {userData ? userData.location : user.location} */}
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>Software developer</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={main} fontWeight='500'>
            Followers
          </Typography>
          <Typography color={main} fontWeight='500'>
            {userData ? userData.followers.length : user.followers.length}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={main} fontWeight='500'>
            Following
          </Typography>
          <Typography color={main} fontWeight='500'>
            {userData ? userData.following.length : user.following.length}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
          Social Profiles
        </Typography>

        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
