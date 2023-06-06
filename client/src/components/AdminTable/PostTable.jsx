import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {  useState } from "react";
import { deletePost } from "../../api/postRequest/postRequest";
import { useDispatch, useSelector } from "react-redux";
import { deleteUpdate } from "../../state/slice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const PostTable = () => {
  const token = useSelector((state) => state.adminToken);
  const dispatch = useDispatch()
 const posts = useSelector((state)=> state.posts)
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [selectedPostId, setSelectedPostId] = useState(null);

 const handleDelete = async (postId) => {
   setSelectedPostId(postId);
   setDeleteDialogOpen(true);
 };

 const handleDeleteConfirm = async () => {
   if (selectedPostId) {
     const result = await deletePost(selectedPostId, token);
     dispatch(deleteUpdate(selectedPostId));
     setSelectedPostId(null);
   }
   setDeleteDialogOpen(false);
 };

 const handleDeleteCancel = () => {
   setSelectedPostId(null);
   setDeleteDialogOpen(false);
 };
  return (
    <div>
      <Typography variant='h6' component='div' sx={{ mb: 2 }}>
        Post Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='post table'>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Caption</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Total Likes</TableCell>
              <TableCell>Total Comments</TableCell>
              <TableCell>Total Reports</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>{post.userName}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <img
                    style={{ objectFit: "cover" }}
                    width={"55px"}
                    height={"55px"}
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt=''
                  />
                </TableCell>
                <TableCell>{post.likes.length}</TableCell>
                <TableCell>{post.comments.length}</TableCell>
                <TableCell>{post.report.length}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(post._id)} 
                    variant='outlined'
                    color='error'
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostTable;
