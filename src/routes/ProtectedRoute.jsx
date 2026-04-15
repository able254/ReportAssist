import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@services/supabaseClient.jsx';

/**
 * ProtectedRoute component that handles both Authentication and Authorization.
 * @param {number} allowedRole - The role_id required to access this route.
 */
const ProtectedRoute = ({ children, allowedRole }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                // 1. Check if a session exists (Authentication)
                const { data: { session } } = await supabase.auth.getSession();
                
                if (!session) {
                    setAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setAuthenticated(true);

                // 2. Check if the user has the correct role (Authorization)
                if (!allowedRole) {
                    // If no specific role is required, any authenticated user is authorized
                    setAuthorized(true);
                } else {
                    const { data: profile, error } = await supabase
                        .from('users')
                        .select('role_id')
                        .eq('id', session.user.id)
                        .single();

                    if (error || !profile || profile.role_id !== allowedRole) {
                        setAuthorized(false);
                    } else {
                        setAuthorized(true);
                    }
                }
            } catch (err) {
                console.error("Security Check Error:", err);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [allowedRole]);

    if (loading) {
        return <div className="loading-spinner">Verifying Access...</div>; 
    }

    if (!authenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (!authorized) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;