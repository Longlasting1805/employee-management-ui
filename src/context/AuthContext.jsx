import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const initializeAuth = async () => {

            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {

                jwtDecode(storedToken);

                setToken(storedToken);

                const profile = await getCurrentUser();

                setUser(profile);

            } catch (error) {

                console.error("Invalid JWT:", error);

                localStorage.removeItem("token");

                setToken(null);

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        initializeAuth();

    }, []);

    const login = async (jwt) => {

        try {

            jwtDecode(jwt);

            localStorage.setItem("token", jwt);

            setToken(jwt);

            const profile = await getCurrentUser();

            setUser(profile);

        } catch (error) {

            console.error("Login token invalid:", error);

            localStorage.removeItem("token");

            setToken(null);

            setUser(null);

            throw error;

        }

    };

    const refreshUser = async () => {

        try {

            const profile = await getCurrentUser();

            setUser(profile);

        } catch (error) {

            console.error(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout,
                refreshUser,
                isAuthenticated: !!token,
                isAdmin: user?.role === "ADMIN",
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}