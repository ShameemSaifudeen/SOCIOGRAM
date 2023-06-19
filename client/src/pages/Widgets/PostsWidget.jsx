import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import PostWidget from "./PostWidget";
import {
  getDisplayPosts,
  getPosts,
  getUserPosts,
} from "../../api/postRequest/postRequest";
import { Box, LinearProgress } from "@mui/material";

// eslint-disable-next-line react/prop-types, no-unused-vars
const PostsWidget = ({ click, userId, isProfile = false, socket }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [post, setPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getPost = async () => {
    const response = await getDisplayPosts(userId, token);
    const data = await response;
    dispatch(setPosts({ posts: data.posts }));
    setIsLoading(false);
  };
  const userPosts = async () => {
    const response = await getUserPosts(userId, token);
    const data = await response;
    dispatch(setPosts({ posts: data.posts }));
    setIsLoading(false);
  };
  const buttonlicked = () => {
    setPost(!post);
  };
  useEffect(() => {
    if (isProfile) {
      userPosts();
    } else {
      getPost();
    }
  }, [post, isProfile, userId, click]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <LinearProgress color='secondary' />
            <LinearProgress color='success' />
            <LinearProgress color='inherit' />
          </Box>
        </>
      ) : posts.length === 0 ? (
        isProfile ? (
          <p>No posts to show</p>
        ) : (
          <p>Follow some friends to see their posts</p>
        )
      ) : (
        posts.map(
          ({
            _id,
            userId,
            userName,
            description,
            image,
            likes,
            comments,
            report,
            createdAt,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserName={userName}
              postUserId={userId}
              postCreatedAt={createdAt}
              name={userName}
              description={description}
              image={image}
              likes={likes}
              comments={comments}
              report={report}
              buttonlicked={buttonlicked}
              isProfile={isProfile ? isProfile : false}
              socket={socket}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
