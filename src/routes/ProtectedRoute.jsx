import { Navigate } from 'react-router-dom';
import { UseAuth }  from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = UseAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;