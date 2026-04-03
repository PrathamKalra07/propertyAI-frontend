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

export const refreshTokenApi = async (refreshToken) => {
    const response = await fetch('http://localhost:8000/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
    });
    if (!response.ok) throw new Error("Refresh failed");
    return response.json(); // { access_token, refresh_token }
};
