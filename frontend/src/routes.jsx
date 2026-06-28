import App from "./App";
import ProtectedRoute from "./components/auths/ProtectedRoute";
import { pathnames } from "./lib/pathnames";
import {
  Homepage,
  NewsPage,
  PublicLayout,
  RentPropertyPage,
  SoldPropertyPage,
} from "./pages/publics";
import Dashboard from "./pages/admins/Dashboard";
import PostPublishPage from "./pages/admins/PostPublishPage";
import PostVerifyPage from "./pages/admins/PostVerifyPage";
import UserManagementPage from "./pages/admins/UserManagementPage";
import ProtectedAdminRoute from "./components/auths/ProtectedAdminRoute";
import AdminSignInPage from "./pages/admins/AdminSignInPage";
import { Navigate } from "react-router";

const routes = [
  {
    path: "/",
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
      }, // ── /admin (không có dấu /) → redirect thẳng về signin ──────────────
      {
        path: pathnames.admins.adminEntry, // '/admin'
        element: <Navigate to={pathnames.admins.signin} replace />,
      },
      {
        path: "/admin/signin",
        element: <AdminSignInPage />,
      },

      {
        path: pathnames.admins.adminLayout,
        element: <ProtectedAdminRoute />,
        children: [
          { path: pathnames.admins.dashboard, element: <Dashboard /> },
          { path: pathnames.admins.publish, element: <PostPublishPage /> },
          { path: pathnames.admins.verifiy, element: <PostVerifyPage /> },
          { path: pathnames.admins.user, element: <UserManagementPage /> },
        ],
      },
    ],
  },
];

export default routes;
