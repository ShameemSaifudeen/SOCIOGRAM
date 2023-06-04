import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween/FlexBetween";
import UserImage from "../UserImage/UserImage";
import { followReq, getUser } from "../../api/userApi/userApi";
import { setFollowers, setFollowing, setFriendFollowers } from "../../state/slice";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Friend = ({ friendId, name, subtitle, userPicturePath,handleRequest }) => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const following = useSelector((state) => state.user.following);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFollowing = following.find((following) => following._id === friendId);
  const followRequest = async () => {
    const response = await followReq(userId, friendId, token);
    dispatch(setFollowers({ followers: response.followers }));
    dispatch(setFollowing({ following: response.following }));
    handleRequest()
  };
  const getuser = async () => {
    const result = await getUser(friendId, token);
    setUser(result);
  };
  useEffect(() => {
    getuser();
  }, [userId]);
  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={user?.displayPicture} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // navigate(0);
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {userId !== friendId && (
        <IconButton
          onClick={() => followRequest()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFollowing ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
