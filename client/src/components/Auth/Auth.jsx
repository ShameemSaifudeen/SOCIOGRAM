import {
  Avatar,
  Paper,
  Container,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Icon from "./Icon";
import { useState } from "react";
import useStyle from './style'
import Input from "./input";
import { useDispatch,useSelector } from "react-redux";
import { register,login } from "../../api/AuthRequest/AuthRequest";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state/slice";

const AuthContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();
  const [IssignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(true);
const user = useSelector((state)=>state.user)
  const [data, setData] = useState({
    name: "",
    lastname: "",
    userName: "",
    number: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (IssignUp) {
      if (data.confirmpass === data.password) {
        const userData = await register(data)
        dispatch(setLogin(userData))
        navigate("../home", { replace: true })
      } else {
        setConfirmPassword(false);
      }
    } else {
        const userData = await login(data)
        dispatch(setLogin(userData))
        console.log(user);

        navigate("../home", { replace: true })
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setData({
      name: "",
      userName: "",
      email: "",
      number: "",
      password: "",
      confirmpass: "",
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    resetForm();
  };

  return (
    <AuthContainer maxWidth="xs" component="main" className={classes.container}>
      <Paper elevation={8} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{IssignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {IssignUp && (
              <>
                <Input
                  name="userName"
                  label="User Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  pattern="^(?! )[A-Za-z ]+$"
                />
                <Input
                  name="name"
                  label="Full Name"
                  handleChange={handleChange}
                  half
                  pattern="^(?! )[A-Za-z ]+$"
                />
                <Input
                  name="email"
                  label="Email"
                  handleChange={handleChange}
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <Input
                  name="number"
                  label="Number"
                  handleChange={handleChange}
                  type="number"
                />
              </>
            )}
            {!IssignUp && (
              <Input
                name="userName"
                label="User Name"
                handleChange={handleChange}
                pattern="^(?! )[A-Za-z ]+$"
              />
            )}
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              pattern="^(?! )[^\s]{3,}$"
            />
            {IssignUp && (
              <>
                <Input
                  name="confirmpass"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                  
                />
                <span
                  style={{
                    display: confirmPassword ? "none" : "block",
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                  }}
                >
                  * Passwords do not match
                </span>
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ marginTop: '16px', marginBottom: '8px', marginLeft: '0' }}
          >
            {IssignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            className={classes.googleButton}
            style={{ marginBottom: '8px' }}
            color="primary"
            fullWidth
            startIcon={<Icon />}
            variant="contained"
          >
            Google Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {IssignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </AuthContainer>
  );
};

export default Auth;
