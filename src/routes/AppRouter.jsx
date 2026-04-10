import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import UserDashboard from "../pages/citizen/Dashboard.jsx";

export const AppRouter = createBrowserRouter([
    
    //{ path: "/", element: <SignIn /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/user/dashboard", element: <UserDashboard/>},

]);