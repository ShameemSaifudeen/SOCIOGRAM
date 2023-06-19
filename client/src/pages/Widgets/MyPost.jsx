/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserImage from "../../components/UserImage/UserImage";
import WidgetWrapper from "../../components/Widget/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { setUpdatePost } from "../../state/slice";
import { createPost } from "../../api/postRequest/postRequest";

const MyPostWidget = ({ picturePath, handleClick }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [images, setImages] = useState([]);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, userName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const handlePost = async () => {
    if (images.length === 0) {
      console.log("inside if");
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (images.length > 0) {
      images.forEach((selectedImage, index) => {
        formData.append(`picture`, selectedImage);
        formData.append(`image${index}`, selectedImage.name);
      });
      formData.append("userName", userName);
    }
    setIsLoading(true);

    try {
      const posts = await createPost(token, formData);
      dispatch(setUpdatePost({ posts: posts.newPost }));
      setImages([]);
      setPost("");
      setIsImage(false);
      handleClick();
      // navigate(0);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post");
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleImageDrop = (acceptedFiles) => {
    const selectedImages = acceptedFiles.filter((file) =>
      file.type.includes("image")
    );
  
    const selectedVideos = acceptedFiles.filter((file) =>
      file.type.includes("video")
    );
  
    if (selectedImages.length > 0 || selectedVideos.length > 0) {
      const selectedFiles = [...selectedImages, ...selectedVideos];
      setImages(selectedFiles);
    } else {
      toast.error("Please select valid image or video files (jpg/jpeg/png/mp4)");
    }
  };
  

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
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
          <Dropzone acceptedFiles=".jpg,.jpeg,.png,.mp4" multiple={true} onDrop={handleImageDrop}>
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
                  {images.length === 0 ? (
                    <p>Add Image(s) Here</p>
                  ) : (
                    <FlexBetween flexDirection="column">
                      {images.map((image, index) => (
                        <FlexBetween key={index}>
                          <Typography>{image.name}</Typography>
                          <IconButton onClick={() => handleDeleteImage(index)} sx={{ width: "15%" }}>
                            <DeleteOutlined />
                          </IconButton>
                        </FlexBetween>
                      ))}
                    </FlexBetween>
                  )}
                </Box>
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
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <VideocamOutlined sx={{ color: palette.neutral.mediumMain }} />
          <Typography color={palette.neutral.mediumMain} sx={{ "&:hover": { cursor: "pointer", color: palette.neutral.medium } }}>
            Video
          </Typography>
        </FlexBetween>

            {/* <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: palette.neutral.mediumMain }} />
              <Typography color={palette.neutral.mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: palette.neutral.mediumMain }} />
              <Typography color={palette.neutral.mediumMain}>Audio</Typography>
            </FlexBetween> */}
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
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px", // Set height as per your requirements
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <ToastContainer position="center" autoClose={3000} hideProgressBar closeOnClick draggable pauseOnHover />
    </WidgetWrapper>
  );
};

export default MyPostWidget;
