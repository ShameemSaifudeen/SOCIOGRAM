import API from "../instance";

export const getUser = async (userId, token) => {
    try {
      const response = await API.get(`api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json()
      return data
    } catch (error) {
      // Handle error
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  