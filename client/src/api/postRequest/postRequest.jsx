
import API from "../instance";

export const createPost = async (token, formData) => {
  try {
    const response = await API.post("api/post/", formData, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};
export const singlePost = async (token, postId) => {
  try {
    const response = await API.get(`api/post/singlePost/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};
export const editPost = async (postId, formData, token) => {
  try {
    const response = await API.put(`api/post/${postId}`, {description:formData}, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async (token) => {
  try {
    const response = await API.get("api/post/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting posts:", error);
    throw error;
  }
};
export const getDisplayPosts = async (userId,token) => {
  try {
    const response = await API.get(`api/post/timeLinePost/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting posts:", error);
    throw error;
  }
};
export const getUserPosts = async (userId, token) => {
  try {
    const response = await API.get(`api/post/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting user posts:", error);
    throw error;
  }
};

export const getLike = async (token, postId, loggedUserId) => {
  try {
    const response = await API.put(
      `api/post/${postId}/like`,
      { loggedId: loggedUserId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting user posts:", error);
    throw error;
  }
};
export const deletePost = async (postId, token) => {
  try {
    const response = await API.delete(`api/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting user posts:", error);
    throw error;
  }
};
export const commentAdd = async (loggedUserId,postId,commentInput,token) => {
  try {
    const response = await API.put(`api/post/${postId}/comment`,{userId: loggedUserId,comment:commentInput} ,{
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data.commentAdded;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting user posts:", error);
    throw error;
  }
};
export const deleteComment = async (index,loggedUserId,postId,token) => {
  try {
    const response = await API.put(`api/post/${postId}/commentDelete`,{userId: loggedUserId,index:index} ,{
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data.deletedComment;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting user posts:", error);
    throw error;
  }
};
export const reportPost = async (loggedUserId,postId,reason,token) => {
  try {
    const response = await API.put(`api/post/${postId}/report`,{userId: loggedUserId,reason:reason} ,{
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data.reportedPost;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error getting user posts:", error);
    throw error;
  }
};
