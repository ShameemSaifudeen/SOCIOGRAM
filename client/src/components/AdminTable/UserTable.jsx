/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { getAllUsers, userHandle } from "../../api/AdminRequest/AdminRequest";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";

const UserTable = () => {
  const token = useSelector((state) => state.adminToken);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
const handleUser = async(userId) => {
  const user = await userHandle(userId,token)
  const updatedUsers = users.map((user) => {
    if (user._id === userId) {
      return { ...user, isBlocked: !user.isBlocked };
    }
    return user;
  });
  setUsers(updatedUsers);
}
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers(token);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayUsers = users.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <Typography variant='h6' component='div' sx={{ mb: 2 }}>
        User Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='user table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Profile Picture</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Total Posts</TableCell>
              <TableCell>Total Following</TableCell>
              <TableCell>Total Followers</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    width={"55px"}
                    height={"55px"}
                    src={
                      user.displayPicture
                        ? `http://localhost:5000/uploads/${user.displayPicture}`
                        : "/assets/150-1503945_transparent-user-png-default-user-image-png-png (1).png"
                    }
                    alt=''
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.posts.length}</TableCell>
                <TableCell>{user.following.length}</TableCell>
                <TableCell>{user.followers.length}</TableCell>
                <TableCell>
                  {user.isBlocked ? (
                    <Button variant='outlined' color='primary' onClick={()=>handleUser(user._id)}>
                      Activate
                    </Button>
                  ) : (
                    <Button variant='outlined' color='secondary' onClick={()=>handleUser(user._id)}>
                      Deactivate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(users.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2 }}
      />
    </div>
  );
};

export default UserTable;
