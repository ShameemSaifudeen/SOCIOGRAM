import API from "../instance";



export const register = async (formData,onSubmitProps,handleToast) => {
  try {
    const response = await API.post("/api/auth/register", formData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    handleToast(error.response.data.message, 'error');
    throw error;
  }
};

export const login = async (formData,onSubmitProps,handleToast) => {
  try {
    const response = await API.post("/api/auth/login", formData);
    console.log(response.data.status);

    return response.data;
  } catch (error) {
    // Handle error
    handleToast(error.response.data.message, 'error');

    console.error( error.response.data.message);
    throw error;
  }
};


