import App from './App';
import ProtectedRoute from './components/auths/ProtectedRoute';
import { pathnames } from './lib/pathnames';
import {
  Homepage,
  NewsPage,
  PublicLayout,
  RentPropertyPage,
  SoldPropertyPage,
} from './pages/publics';
import UserSignInPage from './pages/users/UserSignInPage';
import UserSignUpPage from './pages/users/UserSignUpPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: pathnames.publics.layout,
        element: <PublicLayout />,
        children: [
          { path: pathnames.publics.homepage, element: <Homepage /> },
          { path: pathnames.publics.news, element: <NewsPage /> },
          { path: pathnames.publics.rentProperty, element: <RentPropertyPage /> },
          { path: pathnames.publics.soldProperty, element: <SoldPropertyPage /> },
          { path: pathnames.users.layout, element: <ProtectedRoute></ProtectedRoute> },
        ],
      },
    ],
  },
];

export default routes;
