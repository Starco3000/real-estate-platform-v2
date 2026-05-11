import api from '@/lib/axios';

export const authService = {
  signUp: async (firstname, lastname, phone, email, password) => {
    const res = await api.post(
      '/auth/signup',
      { firstname, lastname, phone, email, password },
      { withCredentials: true },
    );
    return res.data;
  },

  signIn: async (identifier, password) => {
    const res = await api.post('/auth/signin', { identifier, password }, { withCredentials: true });
    return res.data;
  },

  signOut: async () => {
    return api.post('/auth/signout', {}, { withCredentials: true });
  },
};
