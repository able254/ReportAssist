import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthContextProvider>
        <RouterProvider router={AppRouter} />  
     </AuthContextProvider>
  </StrictMode>
);