import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, FirebaseAuthService } from '../services/authService';
import { ApiService, AxiosApiService } from '../services/apiService';


interface User {
    id: string;
    name: string;
    email: string;
    photoUrl?: string;
    idCuenta: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const authService: AuthService = new FirebaseAuthService();
    const apiService: ApiService = new AxiosApiService();

    const syncUserWithBackend = async (firebaseUser: any) => {
        try {
            const user = await apiService.syncUserWithBackend(firebaseUser);
            setUser(user);
        } catch (error) {
            console.error('Error sincronizando usuario:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                syncUserWithBackend(firebaseUser);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        try {
            const firebaseUser = await authService.loginWithGoogle();
            await syncUserWithBackend(firebaseUser);
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Error en logout:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};