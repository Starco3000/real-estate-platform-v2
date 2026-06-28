import api from "@/lib/axios";

export const authService = {
  signUp: async (firstname, lastname, phone, email, password) => {
    const res = await api.post(
      "/auth/signup",
      { firstname, lastname, phone, email, password },
      { withCredentials: true },
    );
    return res.data;
  },

  signIn: async (identifier, password) => {
    const res = await api.post("/auth/signin", { identifier, password }, { withCredentials: true });
    return res.data;
  },

  signOut: async () => {
    return api.post("/auth/signout", {}, { withCredentials: true });
  },
  fetchUser: async () => {
    const res = await api.get("/users/me", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh", { withCredentials: true });
    return res.data.accessToken;
  },
};

export const authAdminService = {
  signIn: async (identifier, password) => {
    const res = await api.post(
      "/auth/admin/signin",
      { identifier, password },
      { withCredentials: true },
    );
    return res.data;
  },

  signOut: async () => {
    return api.post("/auth/admin/signout", {}, { withCredentials: true });
  },
  fetchAdmin: async () => {
    const res = await api.get("/admins/me", { withCredentials: true });
    return res.data?.admin;
  },

  refreshAdmin: async () => {
    const res = await api.post("/auth/admin/refresh", {}, { withCredentials: true });
    return res.data?.accessToken;
  },
};
