import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}!</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Protected Home Page</h2>
                    <p className="text-gray-600">
                        This is a protected page. You can only see this if you're authenticated.
                    </p>
                    <div className="mt-4 p-4 bg-gray-50 rounded">
                        <h3 className="font-medium">Your Profile:</h3>
                        <p>Email: {user?.email}</p>
                        <p>ID: {user?.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
