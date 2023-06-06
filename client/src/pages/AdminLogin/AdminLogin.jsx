import { useState } from "react";
import {
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "../../state/slice";
import { adminLogin } from "../../api/AdminRequest/AdminRequest";
// import { register, login } from "../../api/AuthRequest/AuthRequest";
// import { googleLogin } from "../../api/AuthRequest/AuthRequest";
// import { signInWithPopup } from "firebase/auth";
// import { auth,provider } from "../../api/FireBaseConfig/FireBaseConfIg";
const AdminLogin = () => {
  let classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (values, onSubmitProps) => {

      const adminData = await adminLogin(values, onSubmitProps, handleToast);
      dispatch(setAdminLogin(adminData));
    //   navigate("../home", { replace: true });
    
  };
  const handleToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const getValidationSchema = () => {
   
      return yup.object().shape({
        userName: yup.string().required("UserName is required"),
        password: yup.string().required("Password is required"),
      });
    
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      number: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getValidationSchema(),
    onSubmit: handleSubmit,
  });

//   const switchMode = () => {
//     setIsSignup((prevIsSignup) => !prevIsSignup);
//     formik.resetForm();
//   };
  
  return (
    <Container
      component='main'
      maxWidth='xs'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/* <ToastContainer position="bottom-left" /> */}
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component='h1' variant='h5'>
           Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
          
           
              <Input
                name='userName'
                label='UserName'
                handleChange={formik.handleChange}
                value={formik.values.userName}
                error={formik.errors.userName}
              />
           

           

            <Input
              name='password'
              label='Password'
              handleChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
           
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            style={{ margin: "16px 0 16px" }}
          >
            Sign In
          </Button>

         

          <Grid container justifyContent='space-between'>

{/* <Button onClick={handleGoogleLogin}>Login with Google</Button> */}
          
            <Grid item>
              {/* <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Login In"
                  : "New user? Sign Up"}
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer position='bottom-center' />
    </Container>
  );
};

export default AdminLogin;
