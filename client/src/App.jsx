import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import ProfilePage from "./pages/Profile/Profile";
import ChatPage from "./pages/Chat/Chat";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminHome from "./pages/AdminHome/AdminHome";
import CallPage from "./pages/Call/Call";
import NotFoundPage from "./pages/404Page/404Page";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.token);
  const adminToken = useSelector((state) => state.adminToken);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path='/'
              element={token ? <Navigate to='home' /> : <Navigate to='auth' />}
            />
            <Route
              path='/home'
              element={token ? <Home /> : <Navigate to='../auth' />}
            />
            <Route
              path='/auth'
              element={token ? <Navigate to='../home' /> : <Auth />}
            />
            <Route
              path='/profile/:userId'
              element={token ? <ProfilePage /> : <Navigate to='/' />}
            />
            <Route
              path='/chat/'
              element={token ? <ChatPage /> : <Navigate to='/' />}
            /> 
             <Route
            path='/room/:roomId'
            element={token ? <CallPage /> : <Navigate to='/' />}
          />
            <Route
              path='/admin'
              element={
                adminToken ? <Navigate to='/admin/home' /> : <AdminLogin />
              }
            />
            <Route
              path='/admin/home'
              element={adminToken ? <AdminHome /> : <Navigate to='/admin' />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
