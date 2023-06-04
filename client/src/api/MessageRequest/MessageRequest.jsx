import API from "../instance";

export const getMessages = async (token, id) => {
  try {
    
    const response = await API.get(`/api/message/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};
export const addMessage = async (token, message) => {
  try {
    
    const response = await API.post(`/api/message/`,message, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};