/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  // MoreHorizOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import Friend from "../../components/Friend/Friend";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import { getLike } from "../../api/postRequest/postRequest";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost, deleteUpdate } from "../../state/slice";
import { deletePost } from "../../api/postRequest/postRequest";

// eslint-disable-next-line react/prop-types
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  image,
  likes,
  comments,
  buttonlicked,
  isProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false); // State to toggle delete confirmation dialog visibility
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes.includes(loggedInUserId);
  const isCurrentUserPost = loggedInUserId === postUserId; // Check if the logged-in user is the post creator
  const picturePath = true;
  const token = useSelector((state) => state.token);
  const loggedUserId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dispatch = useDispatch();
  const likeCount = likes.length;
  const commentCount = comments.length;
  const handleLike = async () => {
    const result = await getLike(token, postId, loggedUserId);
    dispatch(setPost({ post: result.likedPost }));
    buttonlicked();
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-unused-vars
    const result = await deletePost(postId, token);
    dispatch(deleteUpdate(postId));
  };

  const handleDeleteConfirm = () => {
    setIsDeleteVisible(false);
    handleDelete();
  };

  const handleDeleteCancel = () => {
    setIsDeleteVisible(false);
  };

  return (
    <WidgetWrapper m={isProfile ? "0rem 0 2rem 0" : "2rem 0"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle='kollam'
        userPicturePath=''
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:5000/uploads/${image}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{commentCount}</Typography>
          </FlexBetween>
        </FlexBetween>

        {isCurrentUserPost && (
          <IconButton onClick={() => setIsDeleteVisible(true)}>
            <DeleteOutlined />
          </IconButton>
        )}
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          <Box>
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              Nice
            </Typography>
          </Box>
          <Divider />
        </Box>
      )}

      <Dialog open={isDeleteVisible} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;
