// src/components/AppLoader.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Renders nothing (or a spinner) until the session is rehydrated.
 * Wrap this around anything that reads `user` from AuthContext.
 */
export default function AppLoader({ children }) {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-[#f0f2f5]">
                <div className="w-8 h-8 rounded-full border-2 border-[#0f1117] border-t-transparent animate-spin" />
            </div>
        );
    }

    return children;
}