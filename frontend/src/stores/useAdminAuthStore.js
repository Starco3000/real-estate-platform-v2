import { authAdminService } from "@/services/authService";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAdminAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      admin: null,
      loading: false,

      setAccessToken(accessToken) {
        set({ accessToken });
      },

      setAdmin: (admin) => {
        set({ admin });
      },

      clearState: () => {
        set({ accessToken: null, admin: null, loading: false });
      },

      signIn: async (identifier, password) => {
        try {
          set({ loading: true });
          const { accessToken } = await authAdminService.signIn(identifier, password);
          set({ accessToken });
          toast.success("Đăng nhập thành công!");
          return true;
        } catch (error) {
          // console.error(error);
          toast.error("Đăng nhập không thành công!");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          await authAdminService.signOut();
          get().clearState();
          toast.success("Đăng xuất thành công!");
        } catch (error) {
          console.error(error);
          toast.error("Lỗi xảy ra khi đăng xuất. Vui lòng thử lại!");
        }
      },

      fetchAdmin: async () => {
        try {
          set({ loading: true });
          const admin = await authAdminService.fetchAdmin(); //GET /admins/me
          set({ admin });
        } catch (error) {
          set({ admin: null, accessToken: null });
          toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng Admin. Xin hãy thử lại sau!");
        } finally {
          set({ loading: false });
        }
      },

      refreshAdmin: async () => {
        try {
          set({ loading: true });
          const { admin, fetchAdmin, setAccessToken } = get();
          const accessToken = await authAdminService.refreshAdmin();
          setAccessToken(accessToken);
          if (!admin) {
            await fetchAdmin();
          }
        } catch (error) {
          // console.error(error);
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage ",
      partialize: (state) => ({ admin: state.admin, accessToken: state.accessToken }), // Chỉ persist user
    },
  ),
);
