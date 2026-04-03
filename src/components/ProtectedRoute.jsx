// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Requires the user to be logged in.
 * If not authenticated → redirect to /auth
 */
export function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // wait for session rehydration before deciding

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
}

/**
 * Requires the user to be an ADMIN.
 * If not admin → redirect to user home /
 */
export function RequireAdmin({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (!user?.is_admin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

/**
 * Requires the user to be a regular USER (not admin).
 * If admin → redirect to admin home /manage-tickets
 */
export function RequireUser({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (user?.is_admin) {
        return <Navigate to="/manage-tickets" replace />;
    }

    return children;
}

/**
 * If already logged in, redirect away from the auth page.
 * Admin → /manage-tickets, User → /
 */
export function RedirectIfAuthenticated({ children }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Navigate to={user?.is_admin ? '/manage-tickets' : '/'} replace />;
    }

    return children;
}