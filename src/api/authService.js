import axios from "axios";

export const loginUser = async (email, password) => {
    const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
    });
    return response.data;
};

export const signupUser = async (username, email, password, role) => {
    const response = await axios.post('http://localhost:8000/auth/signup', {
        username,   
        email,
        password,
        role
    });
    return response.data;
};

export const logoutUser = async (token) => {
    const response = await axios.post(
        `http://localhost:8000/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
