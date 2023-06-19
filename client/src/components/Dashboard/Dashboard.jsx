import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Label,
} from "recharts";
import Chart from "../Chart/Chart";
import { getAllUsers } from "../../api/AdminRequest/AdminRequest";
import { useSelector } from "react-redux";
import { getPosts } from "../../api/postRequest/postRequest";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    height: 200,
    backgroundColor: "#00D5FA", // Custom primary color
    color: "#FFFFFF", // Custom text color
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "#00D5FA",
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  value: {
    fontWeight: 500,
  },
  chartContainer: {
    height: 300,
    marginTop: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.adminToken);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers(token);
        setUsers(response);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const getAllPosts = async () => {
      const result = await getPosts(token);
      setPosts(result.posts);
      // setLoading(false);
    };

    getUsers();
    getAllPosts();
  }, [token]);
  const filteredUsers = users.filter((user) => user?.report?.length > 0);
  const filteredPosts = posts.filter((post) => post?.report?.length > 0);
  // Sample data for line charts

  const userRegistrations = users.reduce((acc, user) => {
    const registrationDate = new Date(user.createdAt);
    const dayOfWeek = registrationDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});

  // Convert user registrations to an array of objects for recharts
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Create an array of data for user registrations
  const userRegistrationData = daysOfWeek.map((day) => ({
    day,
    registrations: userRegistrations[day] || 0,
  }));
  const postsPerDayData = posts.reduce((acc, post) => {
    const postDate = new Date(post.createdAt);
    const dayOfWeek = postDate.toLocaleDateString("en-US", { weekday: "long" });
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});

  const postsData = daysOfWeek.map((day) => ({
    day,
    posts: postsPerDayData[day] || 0,
  }));

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant='h5' component='h2' className={classes.title}>
              Total Users
            </Typography>
            <Typography variant='h4' className={classes.value}>
              {users.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant='h5' component='h2' className={classes.title}>
              Total Posts
            </Typography>
            <Typography variant='h4' className={classes.value}>
              {posts.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant='h5' component='h2' className={classes.title}>
              Total Reports
            </Typography>
            <Typography variant='h4' className={classes.value}>
              {filteredPosts.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant='h5' component='h2' className={classes.title}>
              Total User Reports
            </Typography>
            <Typography variant='h4' className={classes.value}>
              {filteredUsers.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.chartContainer}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant='h6'
                style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Users Registration per Day
              </Typography>
            </div>
            <ResponsiveContainer>
              <BarChart data={userRegistrationData}>
                <XAxis
                  dataKey='day'
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  labelStyle={{ fontSize: 14 }}
                />
                <Legend />
                <Bar
                  dataKey='registrations'
                  fill='#00D5FA'
                  barSize={40}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.chartContainer}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant='h6'
                style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
              >
                Number of Posts per Day
              </Typography>
            </div>
            <ResponsiveContainer>
              <BarChart data={postsData}>
                <XAxis
                  dataKey='day'
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  labelStyle={{ fontSize: 14 }}
                />
                <Legend />
                <Bar
                  dataKey='posts'
                  fill='#6A4CAA'
                  barSize={40}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={5} />
      <Paper className={classes.chartContainer}>
        <Chart users={users} />
      </Paper>
    </div>
  );
};

export default Dashboard;
