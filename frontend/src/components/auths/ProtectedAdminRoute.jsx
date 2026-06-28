import { pathnames } from "@/lib/pathnames";
import { useAdminAuthStore } from "@/stores/useAdminAuthStore";
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedAdminRoute = () => {
  const { accessToken, admin, loading, refreshAdmin, fetchAdmin } = useAdminAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    try {
      let token = accessToken;

      if (!token) {
        token = await refreshAdmin();
      }
      if (token && !admin) {
        await fetchAdmin();
      }
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (starting || loading) {
    return <div className='flex h-screen items-center justify-center'>Đang tải trang....</div>;
  }

  // Chưa đăng nhập → về trang signin admin
  if (!accessToken) {
    return <Navigate to={pathnames.admins.signin} replace />;
  }

  // Đã đăng nhập nhưng không phải admin → về trang chủ
  if (admin?.role !== "admin") {
    return <Navigate to={pathnames.publics.homepage} replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
