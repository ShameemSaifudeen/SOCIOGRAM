/* eslint-disable react/prop-types */
import { Box, Typography, Modal, TextField, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { updateProfile } from "../../api/userApi/userApi";
import { useSelector,useDispatch } from "react-redux";
import { setUpdate } from "../../state/slice";


const AccountEditModal = ({ open, onClose, userData,handleClick }) => {
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    number: Yup.string().required("Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    location: Yup.string().required("Location is required"),
    bio: Yup.string().required("Bio is required"),
  });
  const token = useSelector((state)=>state.token)
  const formik = useFormik({
    initialValues: {
      userName: userData.userName,
      name: userData.name,
      number: userData.number,
      email: userData.email,
      location: userData.location,
      bio: userData.bio,
      picture: null,
    },
    validationSchema,
    onSubmit: async(values) => {
        const formData = new FormData();
        formData.append("userName", values.userName);
        formData.append("name", values.name);
        formData.append("number", values.number);
        formData.append("email", values.email);
        formData.append("location", values.location);
        formData.append("bio", values.bio);
        formData.append("picture", values.picture);
        try {
          const updated = await updateProfile(userData._id,token,formData )
          dispatch(setUpdate(updated))
          if(handleClick){
            handleClick()
          }
          onClose();
        } catch (error) {
          // Handle the error
          console.error("Error submitting form:", error);
          toast.error("Error submitting form. Please try again.");
        }
      onClose();
    },
  });

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

  const handleDropzoneChange = (acceptedFiles) => {
    setFieldValue("picture", acceptedFiles[0]);
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Username"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.userName && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Number"
                name="number"
                value={values.number}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.number && Boolean(errors.number)}
                helperText={touched.number && errors.number}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Location"
                name="location"
                value={values.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bio"
                name="bio"
                value={values.bio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={touched.bio && Boolean(errors.bio)}
                helperText={touched.bio && errors.bio}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Add the Dropzone for picture */}
              <Box border={`1px solid #ccc`} borderRadius="5px" p="1rem" mb="1rem">
                <Dropzone
                  acceptedFiles={[".jpeg", ".jpg", ".png"]}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    // Access the uploaded files here
                    if (acceptedFiles && acceptedFiles.length > 0) {
                      const file = acceptedFiles[0];
                      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                      if (!allowedTypes.includes(file.type)) {
                        toast.error("Only JPEG, JPG, and PNG images are allowed.");
                      } else {
                        handleDropzoneChange(acceptedFiles);
                      }
                    } else {
                      toast.error("Invalid file format. Please upload an image file.");
                    }
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed #1976d2`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <Typography>Add Picture Here</Typography>
                      ) : (
                        <Box display="flex" alignItems="center">
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </Box>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </Grid>
          </Grid>

          {/* Add the save changes button */}
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default AccountEditModal;
