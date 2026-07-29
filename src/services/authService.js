import api from "../api/api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfile = async (profile) => {

  const response = await api.put(
      "/auth/me",
      profile
  );

  return response.data;

};

export const changePassword = async (passwords) => {

  const response = await api.put(
      "/auth/change-password",
      passwords
  );

  return response.data;

};

export default authService;