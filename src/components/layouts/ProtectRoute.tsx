import { useAuth } from '@/contexts/authContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
