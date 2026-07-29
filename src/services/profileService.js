import api from "./api";

export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

export const updateProfile = async (profile) => {
    const response = await api.put("/auth/me", profile);
    return response.data;
};