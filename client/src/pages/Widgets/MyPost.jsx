/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserImage from "../../components/UserImage/UserImage";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { setUpdatePost } from "../../state/slice";
import { createPost } from "../../api/postRequest/postRequest";

const MyPostWidget = ({ picturePath,handleClick }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, userName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const handlePost = async () => {
    if (isImage && !image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("image", image.name);
      formData.append("userName", userName);
    }

    try {
      const posts = await createPost(token, formData);
      dispatch(setUpdatePost({ posts: posts.newPost }));
      setImage(null);
      setPost("");
      setIsImage(false);
      handleClick()
      navigate(0);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post");
    }
  };

  const handleImageDrop = (acceptedFiles) => {
    const selectedImage = acceptedFiles[0];
    const isImageValid = selectedImage && selectedImage.type.includes("image");

    if (isImageValid) {
      setImage(selectedImage);
    } else {
      toast.error("Please select a valid image file (jpg/jpeg/png)");
    }
  };
  

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => {
            const value = e.target.value;
            if (!value.startsWith(" ")) {
              setPost(value);
            }
            // else{
            //   setPost()
            // }
          }}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} onDrop={handleImageDrop}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? <p>Add Image Here</p> : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: palette.neutral.mediumMain }} />
          <Typography color={palette.neutral.mediumMain} sx={{ "&:hover": { cursor: "pointer", color: palette.neutral.medium } }}>
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: palette.neutral.mediumMain }} />
              <Typography color={palette.neutral.mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: palette.neutral.mediumMain }} />
              <Typography color={palette.neutral.mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: palette.neutral.mediumMain }} />
              <Typography color={palette.neutral.mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: palette.neutral.mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>

      <ToastContainer position="center" autoClose={3000} hideProgressBar closeOnClick draggable pauseOnHover />
    </WidgetWrapper>
  );
};

export default MyPostWidget;
