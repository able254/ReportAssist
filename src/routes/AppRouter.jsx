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
    { path: "/user/dashboard", element: <UserDashboard />},
    { path: "/officer/dashboard", element: <OfficerDashboard />},
    { path: "/admin/dashboard", element: <AdminDashboard />},
    { path: "/triage/dashboard", element: <TriageDashboard />},

    //TODO: Activate ProtectedRoute after developing the actual UserDashboard
    //path: "/user/dashboard", element: {<ProtectedRoute><UserDashboard/></ProtectedRoute></>}},
    
]);