import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {

            state.token = action.payload.token.token;
            state.user = action.payload.token.user;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setFollowers: (state, action) => {
            if (state.user) {
                console.log(action.payload, ">>><<<>>");
                state.user.followers = action.payload.followers;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        setFollowing: (state, action) => {
            if (state.user) {
                console.log(action.payload, ">>><<<>>");
                state.user.following = action.payload.following;
            } else {
                console.error("user friends non-existent :(");
            }
        },

    },
});

export const { setMode, setLogin, setLogout, setPosts, setPost, setFollowers, setFollowing } = authSlice.actions;
export default authSlice.reducer;
