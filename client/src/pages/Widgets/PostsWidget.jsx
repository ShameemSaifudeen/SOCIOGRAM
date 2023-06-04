import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import PostWidget from "./PostWidget";
import { getPosts, getUserPosts } from "../../api/postRequest/postRequest";

// eslint-disable-next-line react/prop-types, no-unused-vars
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [post, setPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getPost = async () => {
    const response = await getPosts(token);
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
  }, [post, isProfile, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts to show</p>
      ) : (
        posts.map(
          ({ _id, userId, userName, description, image, likes, comments, createdAt }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              postCreatedAt={createdAt}
              name={userName}
              description={description}
              image={image}
              likes={likes}
              comments={comments}
              buttonlicked={buttonlicked}
              isProfile={isProfile ? isProfile : false}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
