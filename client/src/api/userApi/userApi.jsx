import API from "../instance";

export const getUser = async (userId, token) => {
  try {
    const response = await API.get(`api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data.user

    return data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const followReq = async (id, friendId, token) => {
  try {
    const response = await API.put(`api/user/${friendId}/follow`, {id:id}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data.result;
    return data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const getFollowers = async (userId, token) => {
  try {
    const response = await API.get(`api/user/${userId}/followers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data;
    return data.followers;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const getFollowing = async (userId, token) => {
  try {
    const response = await API.get(`api/user/${userId}/following`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data;
    return data.following;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const updateProfile = async (userId,token,formData) => {
  try {
    const response = await API.put(`api/user/${userId}/updateProfile`,formData, {
      headers: { Authorization: `Bearer ${token}` },
      
    });
    const data = await response.data.updatedProfile;
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
export const userSearch = async (name,token) => {
  try {
    const response = await API.get(`api/user/search` , {
      params: { name },
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.data.result;
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
