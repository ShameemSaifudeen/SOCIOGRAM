import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PostTable from "../../components/AdminTable/PostTable";
import UserTable from "../../components/AdminTable/UserTable";
import { useDispatch } from "react-redux";
import { setAdminLogout } from "../../state/slice";
import Dashboard from "../../components/Dashboard/Dashboard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminHome = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "user":
        return <UserTable />;
      case "post":
        return <PostTable />;
      case "dashboard":
        return <Dashboard />;
      default:
        return null;
    }
  };
  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            SOCIOGRAAM
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItemButton
            selected={activeTab === "dashboard"}
            onClick={() => handleTabChange("dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
          <ListItemButton
            selected={activeTab === "user"}
            onClick={() => handleTabChange("user")}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='User' />
          </ListItemButton>
          <ListItemButton
            selected={activeTab === "post"}
            onClick={() => handleTabChange("post")}
          >
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary='Post' />
          </ListItemButton>
        </List>
        <Divider />
        <List>
         
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppIcon onClick={() => dispatch(setAdminLogout())} />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminHome;
