import { useAuthStore } from "@/stores/useAuthStore";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

const ProtectedRoute = ({ children }) => {
  const { accessToken, user, loading, refresh, fetchUser } = useAuthStore();
  const [starting, setStarting] = useState(false);
  const [mode, setMode] = useState("login");

  const init = async () => {
    if (!accessToken) await refresh();

    if (accessToken && !user) await fetchUser();

    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  // Loading global
  if (starting || loading) {
    return <div className='flex h-screen items-center justify-center'>Đang tải trang...</div>;
  }

  // Nếu đã login thì cho vào
  if (accessToken) {
    return <>{children}</>;
  }

  // Nếu chưa login => bật Dialog chứa login-form
  return (
    <>
      {children /* Cho phép render nền phía sau*/}
      <Dialog open={true}>
        <DialogContent showCloseButton={false} className='sm:max-w-xs min-w-3xl'>
          <DialogTitle className='sr-only' />
          {mode === "login" ? (
            <LoginForm switchtosignup={() => setMode("signup")} />
          ) : (
            <SignupForm switchtologin={() => setMode("login")} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProtectedRoute;
