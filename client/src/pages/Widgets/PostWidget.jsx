import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween/FlexBetween";
  import Friend from "../../components/Friend/Friend";
  import WidgetWrapper from "../../components/Widget/WidgetWrapper";
  import { useState } from "react";
   // eslint-disable-next-line react/prop-types
  const PostWidget = ({ postId,postUserId,name,description,image,likes,comments}) => {
    const [isComments, setIsComments] = useState(false);
    const [isliked,setIsLiked] = useState(false);
  const picturePath = true
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
 
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId="1"
          name={name}
          subtitle="kollam"
          userPicturePath=""
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={ `http://localhost:5000/uploads/${image}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={()=>setIsLiked(!isliked) } >
                {isliked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{isliked ? 11 : 10}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>1</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            
              <Box >
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                 Nice
                </Typography>
              </Box>
           
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
  