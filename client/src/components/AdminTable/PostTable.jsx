/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../../api/postRequest/postRequest";
import { useDispatch, useSelector } from "react-redux";
import { deleteUpdate } from "../../state/slice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";

const PostTable = () => {
  const token = useSelector((state) => state.adminToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [filterReported, setFilterReported] = useState(false); // New state variable

  const handleDelete = async (postId) => {
    setSelectedPostId(postId);
    // setFilterReported(false); // Reset filter status
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPostId) {
      const result = await deletePost(selectedPostId, token);
      dispatch(deleteUpdate(selectedPostId));
      setSelectedPostId(null);
      setRender(!render);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setSelectedPostId(null);
    setDeleteDialogOpen(false);
  };

  const getAllPosts = async () => {
    const result = await getPosts(token);
    setPosts(result.posts);
    setLoading(false);
  };

  useEffect(() => {
    getAllPosts();
  }, [render]);

  const displayPosts = filterReported
    ? posts.filter((post) => post.report.length > 0)
    : posts.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Post Table
      </Typography>
      <Button
        onClick={() => setFilterReported(!filterReported)}
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
      >
        {filterReported ? "Show All" : "Filter Reported"}
      </Button>
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="post table">
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
                {displayPosts.map((post) => (
                  <TableRow key={post._id}>
                    <TableCell>{post.userName}</TableCell>
                    <TableCell>{post.description}</TableCell>
                    <TableCell>
                      {post.image.length > 1 ? (
                        <>
                          <img
                            style={{ objectFit: "cover", marginRight: "1rem" }}
                            width={"55px"}
                            height={"55px"}
                            src={`http://localhost:5000/uploads/${post.image[0]}`}
                            alt=""
                          />
                          <img
                            style={{ objectFit: "cover" }}
                            width={"55px"}
                            height={"55px"}
                            src={`http://localhost:5000/uploads/${post.image[1]}`}
                            alt=""
                          />
                        </>
                      ) : (
                        <img
                          style={{ objectFit: "cover" }}
                          width={"55px"}
                          height={"55px"}
                          src={`http://localhost:5000/uploads/${post.image[0]}`}
                          alt=""
                        />
                      )}
                    </TableCell>
                    <TableCell>{post.likes.length}</TableCell>
                    <TableCell>{post.comments.length}</TableCell>
                    <TableCell>{post.report.length}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(post._id)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(
              filterReported
                ? displayPosts.length / rowsPerPage
                : posts.length / rowsPerPage
            )}
            page={page}
            onChange={handleChangePage}
            sx={{ mt: 2 }}
          />
        </>
      )}
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
