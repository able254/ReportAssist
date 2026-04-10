import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";

export const AppRouter = createBrowserRouter([
    
    //{ path: "/", element: <SignIn /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },

]);