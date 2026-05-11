import { Outlet } from 'react-router';
import Header from '@/components/headers/Header';

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
