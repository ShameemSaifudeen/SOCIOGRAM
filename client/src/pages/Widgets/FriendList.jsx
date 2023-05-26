import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend/Friend";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFollowers, getFollowing } from "../../api/userApi/userApi";
import { setFollowers, setFollowing } from "../../state/slice";

// eslint-disable-next-line react/prop-types
const FriendListWidget = ({userId, isFollowingList = false }) => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const followers = useSelector((state) => state.user.followers);
  const following = useSelector((state) => state.user.following);
  const { palette } = useTheme();
  const getFriends = async () => {
    const followers = await getFollowers(userId, token);
    const following = await getFollowing(userId, token);
    dispatch(setFollowers({ followers: followers }));
    dispatch(setFollowing({ following: following }));
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: "1.5rem" }}
      >
        {isFollowingList ? "Following List" : "Followers List"}
      </Typography>
      {isFollowingList ? (
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {following.map((following) => (
            <Friend
              key={following._id}
              friendId={following._id}
              name={following.userName}
              subtitle={following.name}
              userPicturePath={following.displayPhoto}
            />
          ))}
        </Box>
      ) : (
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {followers.map((follower) => (
            <Friend
              key={follower._id}
              friendId={follower._id}
              name={follower.userName}
              subtitle={follower.name}
              userPicturePath={follower.displayPhoto}
            />
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
