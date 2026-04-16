import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import ClientSignUpPage from './pages/client/ClientSignUpPage';
import ClientSignInPage from './pages/client/ClientSignInPage';
import AdminSignInPage from './pages/admin/AdminSignInPage';
import Dashboard from './pages/admin/Dashboard';
import Homepage from './pages/client/Homepage';

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path='/signup' element={<ClientSignUpPage />} />
          <Route path='/signin' element={<ClientSignInPage />} />
          <Route path='/admin/signin' element={<AdminSignInPage />} />
          <Route path='/' element={<Homepage />} />

          {/* Privete route */}
          <Route path='/admin/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
