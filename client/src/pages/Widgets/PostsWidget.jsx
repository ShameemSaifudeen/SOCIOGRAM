import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import PostWidget from "./PostWidget";
import { getPosts, getUserPosts } from "../../api/postRequest/postRequest";

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state)=> state.posts)
  const token = useSelector((state) => state.token);
  const [post,setPost] = useState(false)
  const getPost = async () => {
    const response = await getPosts(token);
    const data = await response
    const datas = data.posts
    console.log(datas);
    // setPost(datas)
    dispatch(setPosts({ posts: data.posts}));
  };
const buttonlicked = () =>{
  setPost(!post)
}
  useEffect(() => {
    getPost();
    console.log("hiii");
  }, [post]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {posts.map(({
          _id,
          userId,
          userName,
          description,
          image,
          likes,
          comments
        })=> (
          <PostWidget  key={_id}
          postId={_id}
          postUserId={userId}
          name={userName}
          description={description}
          image={image}
          likes={likes}
          comments={comments}
          buttonlicked={buttonlicked} />
          

      
        ))}
    </>
  );
};

export default PostsWidget;
