import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import UserDashboard from "../pages/citizen/Dashboard.jsx";
import OfficerDashboard from "../pages/officer/Dashboard.jsx";
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import TriageDashboard from "../pages/triage/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export const AppRouter = createBrowserRouter([
    
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/user/dashboard", element: <ProtectedRoute><UserDashboard /></ProtectedRoute>},
    { path: "/officer/dashboard", element: <ProtectedRoute><OfficerDashboard /></ProtectedRoute>},
    { path: "/admin/dashboard", element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>},
    { path: "/triage/dashboard", element: <ProtectedRoute><TriageDashboard /></ProtectedRoute>},
    
]);