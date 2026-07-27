import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT to protected requests
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        // Don't send the token when logging in or registering
        if (
            !config.url.includes("/auth/login") &&
            !config.url.includes("/auth/register") &&
            token
        ) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },
    (error) => Promise.reject(error)
);

// Handle expired or invalid tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/";

        }

        return Promise.reject(error);

    }
);

export default api;