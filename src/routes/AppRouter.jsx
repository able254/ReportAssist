import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn.jsx";

export const AppRouter = createBrowserRouter([
    //{ path: "/", element: <SignIn /> },
    { path: "/signin", element: <SignIn /> },
]);