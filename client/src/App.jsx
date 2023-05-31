import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import ProfilePage from "./pages/Profile/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.token);

  return (
    <div className="app">
      <GoogleOAuthProvider clientId="19614587769-2bsfr3g33qnlbof8p92uq7tll28pv898.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            path="/auth"
            element={token ? <Navigate to="../home" /> : <Auth />}
          />
           <Route
              path="/profile/:userId"
              element={token? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
