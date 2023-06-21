import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFoundPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const adminToken = useSelector((state) => state.adminToken);
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "16px",
  };

  const titleStyle = {
    fontSize: "5rem",
    fontWeight: 700,
    marginBottom: "8px",
  };

  const subTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: 500,
    marginBottom: "8px",
  };

  const buttonStyle = {
    marginTop: "16px",
    padding: "12px 32px",
    fontSize: "1.2rem",
    fontWeight: 600,
    backgroundColor: isHovered ? "#0D3F49" : "#00D5FA",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box style={containerStyle}>
      <Typography variant='h1' style={titleStyle}>
        404
      </Typography>
      <Typography variant='h4' style={subTitleStyle}>
        Page Not Found
      </Typography>
      <Typography variant='body1' align='center' gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant='contained' style={buttonStyle} component={Link} to={adminToken ? "/admin" : "/"} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
