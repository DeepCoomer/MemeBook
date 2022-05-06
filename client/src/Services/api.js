import axios from "axios";

const host = "http://localhost:8000";

export const fetchUser = async (username) => {
    try {
        let response = await axios.get(`${host}/api/users/user/${username}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const userUsingId = async (id) => {
    try {
        let response = await axios.get(`${host}/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${host}/api/users/file/upload`, data);
    } catch (error) {
        console.log("Error while uploading the file", error)
    }
}

export const updateUser = async (id, data) => {
    try {
        let response = await axios.put(`${host}/api/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const followUser = async (id, data) => {
    try {
        let response = await axios.put(`${host}/api/users/${id}/follow`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const unfollowUser = async (id, data) => {
    try {
        let response = await axios.put(`${host}/api/users/${id}/unfollow`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (data) => {
    try {
        let response = await axios.post(`${host}/api/posts`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async (id) => {
    try {
        let response = await axios.get(`${host}/api/posts/timeline/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async (id) => {
    try {
        let response = await axios.get(`${host}/api/posts/user/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const likeAPost = async (id, data) => {
    try {
        let response = await axios.put(`${host}/api/posts/${id}/like`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const postAComment = async (data) => {
    try {
        let response = await axios.post(`${host}/api/comments/newcomment`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAPost = async (id, userId) => {
    try {
        let response = await axios.delete(`${host}/api/posts/${id}/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllComments = async (id) => {
    try {
        let response = await axios.get(`${host}/api/comments/comment/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}