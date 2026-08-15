import type { IUser } from '@/models/user';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthData {
    user: IUser;
    token: string;
}

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuth: (data: AuthData) => void;
    setUser: (user: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedAuth = localStorage.getItem('auth-storage');

            if (storedAuth) {
                const auth: AuthData = JSON.parse(storedAuth);

                setUserState(auth.user);
                setToken(auth.token);
            }
        } catch (error) {
            console.error('Failed to restore auth:', error);

            localStorage.removeItem('auth-storage');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const setAuth = ({ user, token }: AuthData) => {
        setUserState(user);
        setToken(token);

        localStorage.setItem(
            'auth-storage',
            JSON.stringify({
                user,
                token,
            }),
        );
    };

    const setUser = (user: IUser) => {
        setUserState(user);

        localStorage.setItem(
            'auth-storage',
            JSON.stringify({
                user,
                token,
            }),
        );
    };

    const logout = () => {
        setUserState(null);
        setToken(null);

        localStorage.removeItem('auth-storage');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !!token,
                isLoading,
                setAuth,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}
