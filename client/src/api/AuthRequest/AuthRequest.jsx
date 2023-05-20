import API from "../instance";



export const register = async (formData) => {
  try {
    const response = await API.post("/api/auth/register", formData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await API.post("/api/auth/login", formData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    throw error;
  }
};


