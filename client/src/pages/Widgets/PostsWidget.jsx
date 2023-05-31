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
  const getPost = async () => {
    const response = await getPosts(token);
    const data = await response;
    // setPost(datas)
    dispatch(setPosts({ posts: data.posts }));
  };
  const userPosts = async () => {
    const response = await getUserPosts(userId, token);
    const data = await response;
    // setPost(datas)
    dispatch(setPosts({ posts: data.posts }));
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
      {posts.map(
        ({ _id, userId, userName, description, image, likes, comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={userName}
            description={description}
            image={image}
            likes={likes}
            comments={comments}
            buttonlicked={buttonlicked}
            isProfile={isProfile ? isProfile : false}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
