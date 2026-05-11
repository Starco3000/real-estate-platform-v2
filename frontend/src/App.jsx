import { Toaster } from 'sonner';
import { Outlet } from 'react-router';

function App() {
  return (
    <main>
      <Toaster richColors />
      <Outlet />
    </main>
  );
}

export default App;
