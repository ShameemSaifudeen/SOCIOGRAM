import API from "../instance";

export const userChats = async (token, id) => {
  try {
    console.log(id,"L");
    const response = await API.get(`/api/chat/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};
export const addChat = async (senderId,recieverId,token) => {
  try {
    console.log(senderId,recieverId,"L");
    const response = await API.post(`/api/chat/`, {
      senderId: senderId,
      recieverId: recieverId,
    },{
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};