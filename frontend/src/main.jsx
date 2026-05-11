import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

import routes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}><RouterProvider router={router} /></GoogleOAuthProvider>
  </StrictMode>,
);
