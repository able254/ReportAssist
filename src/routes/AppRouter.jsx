import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import UserDashboard from "../pages/citizen/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export const AppRouter = createBrowserRouter([
    
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/user/dashboard", element: <UserDashboard />}

    //TODO: Activate ProtectedRoute after developing the actual UserDashboard
    //path: "/user/dashboard", element: {<ProtectedRoute><UserDashboard/></ProtectedRoute></>}},
    
]);