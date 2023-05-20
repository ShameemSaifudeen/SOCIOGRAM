import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import PostWidget from "./PostWidget";
import { getPosts, getUserPosts } from "../../api/postRequest/postRequest";

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [post,setPost] = useState([])
  const getPost = async () => {
    const response = await getPosts(token);
    const data = await response
    const datas = data.posts
    console.log(datas);
    setPost(datas)
    dispatch(setPosts({ posts: data.posts}));
  };

  useEffect(() => {
    getPost();
    console.log("hiii");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
console.log(post);
  return (
    <>
      {post.map(({
          _id,
          userId,
          userName,
          description,
          image,
          likes,
          comments,
        })=> (
          <PostWidget  key={_id}
          postId={_id}
          postUserId={userId}
          name={userName}
          description={description}
          image={image}
          likes={likes}
          comments={comments} />
          

      
        ))}
    </>
  );
};

export default PostsWidget;
