/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
  MoreHorizOutlined,
  ReportOutlined,
  AddComment,
} from "@mui/icons-material";
import { format } from "timeago.js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
  Popover,
  TextField,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import Friend from "../../components/Friend/Friend";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import {
  commentAdd,
  deleteComment,
  editPost,
  getLike,
  reportPost,
} from "../../api/postRequest/postRequest";
import { useSelector, useDispatch } from "react-redux";
import { setPost, deleteUpdate } from "../../state/slice";
import { deletePost } from "../../api/postRequest/postRequest";
import { useNavigate } from "react-router-dom";
const MAX_DESCRIPTION_LENGTH = 185;
const PostWidget = ({
  postId,
  postUserId,
  postUserName,
  postCreatedAt,
  name,
  description,
  image,
  likes,
  comments,
  report,
  buttonlicked,
  isProfile,
  socket,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDescription, setEditDescription] = useState(description);
  const [reportReason, setReportReason] = useState("");
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes.includes(loggedInUserId);
  const isCurrentUserPost = loggedInUserId === postUserId;
  const picturePath = true;
  const token = useSelector((state) => state.token);
  const { userName } = useSelector((state) => state.user);
  const loggedUserId = useSelector((state) => state.user._id);
  const reported = report.some((report) => report.userId === loggedUserId);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dispatch = useDispatch();
  const likeCount = likes.length;
  const commentCount = comments.length;
  const postTime = format(postCreatedAt);
const isProfilePost = useState(true)
  const handleLike = async () => {
    const result = await getLike(token, postId, loggedUserId);
    dispatch(setPost({ post: result.likedPost }));
    buttonlicked();
    socket.emit("sendNotification", {
      senderName: userName,
      receiverId: postUserId,
      postId: postId,
      type: "liked",
    });
  };

  const handleDelete = async () => {
    const result = await deletePost(postId, token);
    dispatch(deleteUpdate(postId));
    setIsDeleteVisible(false);
  };
  const handleDeleteComment = async (index, userId) => {
    const result = await deleteComment(index, userId, postId, token);
    dispatch(setPost({ post: result }));
  };

  const handleEdit = () => {
    setIsEditVisible(true);
    setAnchorEl(null);
  };

  const handleReport = () => {
    setIsReportVisible(true);
    setAnchorEl(null);
  };

  const handleReportCancel = () => {
    setIsReportVisible(false);
    setReportReason("");
  };

  const handleReportConfirm = async () => {
    const result = await reportPost(loggedUserId, postId, reportReason, token);
    dispatch(setPost({ post: result }));
    setIsReportVisible(false);
    setReportReason("");
  };

  const handleDeleteConfirm = () => {
    setIsDeleteVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteVisible(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isVideo = (fileName) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"]; // Add more video extensions if needed
    const extension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase();
    return videoExtensions.includes(extension);
  };

  const open = Boolean(anchorEl);

  const handleSaveEdit = async () => {
    const result = await editPost(postId, editDescription, token);
    dispatch(setPost({ post: result.editedPost }));
    setIsEditVisible(false);
  };

  const handleAddComment = async () => {
    const comment = `${userName}: ${commentInput}`;
    const result = await commentAdd(loggedUserId, postId, comment, token);
    dispatch(setPost({ post: result }));
    setCommentInput("");
    socket.emit("sendNotification", {
      senderName: userName,
      receiverId: postUserId,
      postId: postId,
      type: "commented",
    });
  };
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const shortDescription = description.slice(0, MAX_DESCRIPTION_LENGTH);
  return (
    <WidgetWrapper m={isProfile ? "0rem 0 2rem 0" : "2rem 0"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={postTime}
        userPicturePath=''
        isProfilePost={isProfilePost}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {showMore ? description : shortDescription}
      </Typography>
      {description.length > MAX_DESCRIPTION_LENGTH && (
        <Button onClick={toggleShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </Button>
      )}
      {image.length > 1 && (
        <>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
          >
            {image.map((imageName, index) => (
              <React.Fragment key={index}>
                {isVideo(imageName) ? (
                  <video
                    src={`https://api.sociograam.online/uploads/${imageName}`}
                    controls
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "0.75rem",
                      marginTop: "0.75rem",
                    }}
                  />
                ) : (
                  <img
                    src={`https://api.sociograam.online/uploads/${imageName}`}
                    alt={`post-image-${index}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "0.75rem",
                      marginTop: "0.75rem",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Carousel>
        </>
      )}

      {image.length === 1 && (
        <>
          {isVideo(image[0]) ? (
            <video
              width='100%'
              height='auto'
              controls
              style={{
                borderRadius: "0.75rem",
                marginTop: "0.75rem",
              }}
            >
              <source
                src={`https://api.sociograam.online/uploads/${image[0]}`}
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              width='100%'
              height='auto'
              alt='post'
              style={{
                borderRadius: "0.75rem",
                marginTop: "0.75rem",
              }}
              src={`https://api.sociograam.online/uploads/${image[0]}`}
            />
          )}
        </>
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

        {isProfile ? (
          isCurrentUserPost ? (
            <div>
              <IconButton
                onClick={handlePopoverOpen}
                aria-describedby='more-options'
              >
                <MoreHorizOutlined />
              </IconButton>
              <Popover
                id='more-options'
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box p={2}>
                  <Button onClick={handleEdit}>Edit</Button>
                  <Button onClick={handleDeleteConfirm} color='error'>
                    Delete
                  </Button>
                </Box>
              </Popover>
            </div>
          ) : (
            <div>
              <IconButton
                onClick={handlePopoverOpen}
                aria-describedby='more-options'
              >
                <MoreHorizOutlined />
              </IconButton>
              <Popover
                id='more-options'
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box p={2}>
                  <Button onClick={handleReport} disabled={reported}>
                    {reported ? "Already Reported" : "Report"}
                  </Button>
                </Box>
              </Popover>
            </div>
          )
        ) : isCurrentUserPost ? (
          <div>
            <IconButton
              onClick={handlePopoverOpen}
              aria-describedby='more-options'
            >
              <MoreHorizOutlined />
            </IconButton>
            <Popover
              id='more-options'
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={2}>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDeleteConfirm} color='error'>
                  Delete
                </Button>
              </Box>
            </Popover>
          </div>
        ) : (
          <div>
            <IconButton
              onClick={handlePopoverOpen}
              aria-describedby='more-options'
            >
              <MoreHorizOutlined />
            </IconButton>
            <Popover
              id='more-options'
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={2}>
                <Button onClick={handleReport} disabled={reported}>
                  {reported ? "Already Reported" : "Report"}
                </Button>
              </Box>
            </Popover>
          </div>
        )}
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map(({ userId, comment }, index) => (
            <React.Fragment key={index}>
              <Box>
                <Divider />
                <FlexBetween alignItems='center'>
                  <Typography
                    onClick={() => navigate(`/profile/${userId}`)}
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                      color: main,
                      m: "0.5rem 0",
                      pl: "1rem",
                    }}
                  >
                    {comment}
                  </Typography>
                  {(isCurrentUserPost || userId === loggedUserId) && (
                    <IconButton
                      onClick={() => handleDeleteComment(index, userId)}
                      size='small'
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <Divider />
            </React.Fragment>
          ))}

          <Box display='flex' alignItems='center' mt='0.5rem'>
            <TextField
              variant='outlined'
              fullWidth
              label='Add a comment...'
              size='small'
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button
              variant='contained'
              size='small'
              onClick={handleAddComment}
              disabled={!commentInput.trim()}
            >
              Post
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={isDeleteVisible} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditVisible} onClose={() => setIsEditVisible(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            variant='outlined'
            fullWidth
            multiline
            rows={4}
            label='Edit description'
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditVisible(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isReportVisible} onClose={handleReportCancel}>
        <DialogTitle>Report Post</DialogTitle>
        <DialogContent>
          <TextField
            variant='outlined'
            fullWidth
            multiline
            rows={4}
            label='Reason for reporting'
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportCancel}>Cancel</Button>
          <Button onClick={handleReportConfirm} color='error'>
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;
