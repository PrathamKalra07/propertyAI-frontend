// src/context/AuthContext.jsx

import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { signupUser, loginUser,logoutUser  } from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // prevent flash of wrong route on refresh

    // Rehydrate session on mount
    const loadUser= async ()=>{
        try {
            const raw = sessionStorage.getItem('user');
            if (raw) {
                setUser(JSON.parse(raw));
                console.log("logged in user : ",JSON.parse(raw));
            }
        } catch (err) {
            console.error('Failed to rehydrate session:', err);
            sessionStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadUser();
    }, []);

    const login = useCallback(async (email, password) => {
        const userData = await loginUser(email, password);
        // userData shape expected: { access_token, role, is_admin, username, email, ... }
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData)); // was missing JSON.stringify
        return userData;
    }, []);

    const signup = useCallback(async (username, email, password, role) => {
        const userData = await signupUser(username, email, password, role);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData)); // was missing JSON.stringify
        return userData;
    }, []);

    const logout = useCallback(async () => {
        try {
            const token = user?.access_token;
            console.log("invalidating token");
            if (token) await logoutUser(token);
        } catch (err) {
            console.error('Logout API error (continuing anyway):', err);
        } finally {
            setUser(null);
            sessionStorage.removeItem('user');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);