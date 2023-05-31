import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Collapse, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../../components/Friend/Friend";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import { getFollowers, getFollowing } from "../../api/userApi/userApi";
import {
  setFollowers,
  setFollowing,
  setFriendFollowing,
  setFriendFollowers,
} from "../../state/slice";

// eslint-disable-next-line react/prop-types
const FriendListWidget = ({ userId, isFollowingList = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.user._id);
  const { followers, following } = useSelector((state) => {
    if (id === userId) {
      return {
        followers: state.user.followers,
        following: state.user.following,
      };
    } else {
      return {
        followers: state.friendFollowers,
        following: state.friendFollowing,
      };
    }
  });
  const { palette } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const displayedFriends = isFollowingList
    ? following.slice(0, 2)
    : followers.slice(0, 2);
  const remainingFriends = isFollowingList
    ? following.slice(2)
    : followers.slice(2);

  const getFriends = async () => {
    const followersData = await getFollowers(userId, token);
    const followingData = await getFollowing(userId, token);
    if (id === userId) {
      dispatch(setFollowers({ followers: followersData }));
      dispatch(setFollowing({ following: followingData }));
    } else {
      dispatch(setFriendFollowers({ followers: followersData }));
      dispatch(setFriendFollowing({ following: followingData }));
    }
  };

  const handleExpand = () => {
    setExpanded(true);
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
      {displayedFriends.length === 0 ? (
        <Typography variant='body1' color={palette.text.secondary}>
          No {isFollowingList ? "following" : "followers"} to display.
        </Typography>
      ) : (
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {displayedFriends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={friend.userName}
              subtitle={friend.name}
              userPicturePath={friend.displayPicture}
            />
          ))}
          {remainingFriends.length > 0 && !expanded && (
            <Button variant='text' onClick={handleExpand}>
              Show More
            </Button>
          )}
          <Collapse in={expanded} timeout='auto'>
            {remainingFriends.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={friend.userName}
                subtitle={friend.name}
                userPicturePath={friend.displayPicture}
              />
            ))}
          </Collapse>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
