import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const { loginWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
                    <p className="mt-2 text-gray-600">Please sign in to continue</p>
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent 
                   rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};