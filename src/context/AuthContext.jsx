import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { signupUser, loginUser, logoutUser, refreshTokenApi } from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const raw = sessionStorage.getItem('user');
            if (raw) setUser(JSON.parse(raw));
        } catch (err) {
            console.error('Failed to rehydrate session:', err);
            sessionStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUser(); }, []);

    const login = useCallback(async (email, password) => {
        const userData = await loginUser(email, password);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        return userData;
    }, []);

    const signup = useCallback(async (username, email, password, role) => {
        const userData = await signupUser(username, email, password, role);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        return userData;
    }, []);

    const logout = useCallback(async () => {
        try {
            if (user?.access_token) await logoutUser(user.access_token);
        } catch (err) {
            console.error('Logout API error (continuing anyway):', err);
        } finally {
            setUser(null);
            sessionStorage.removeItem('user');
        }
    }, [user]);

    const refreshToken = useCallback(async () => {
        const raw = sessionStorage.getItem('user');
        const stored = raw ? JSON.parse(raw) : null;
        if (!stored?.refresh_token) throw new Error("No refresh token");

        const data = await refreshTokenApi(stored.refresh_token);

        const updated = { ...stored, access_token: data.access_token, refresh_token: data.refresh_token };
        setUser(updated);
        sessionStorage.setItem('user', JSON.stringify(updated));

        return data.access_token;
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);