import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Loader2, User, Stethoscope, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('patient');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login, loading, error, isAuthenticated } = useAuth();

    useEffect(() => {
        const userParam = searchParams.get('user');
        if (userParam === 'admin' || userParam === 'patient') {
            setUserType(userParam);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isAuthenticated) {
            const userRole = localStorage.getItem('userRole') || 'patient';
            if (userRole === 'admin' || userRole === 'dentist' || userRole === 'staff') {
                navigate('/app');
            } else {
                navigate('/patient');
            }
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            return;
        }

        try {
            await login(email, password);
            // Store user role for navigation
            const userRole = email.includes('admin') || email.includes('dentist') || email.includes('staff') ? 'admin' : 'patient';
            localStorage.setItem('userRole', userRole);
        } catch (error) {
            // Error is handled by the auth context
            console.error('Login failed:', error);
        }
    };

    const toggleUserType = (type) => {
        setUserType(type);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Back to Landing */}
                <Link
                    to="/"
                    className="flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Landing Page
                </Link>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* User Type Toggle */}
                    <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => toggleUserType('patient')}
                            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                                userType === 'patient'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <User size={18} className="mr-2" />
                            Patient
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleUserType('admin')}
                            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                                userType === 'admin'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Stethoscope size={18} className="mr-2" />
                            Admin
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {userType === 'admin' ? 'Admin Login' : 'Patient Login'}
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {userType === 'admin' 
                                ? 'Access clinic management dashboard' 
                                : 'Access your patient portal'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-900"
                                    placeholder={userType === 'admin' ? 'admin@clinic.com' : 'patient@email.com'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-gray-900"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                                <AlertCircle className="text-red-500 mr-2" size={20} />
                                <span className="text-red-700 text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    {userType === 'admin' ? 'Access Dashboard' : 'Access Portal'}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {userType === 'admin' ? "Don't have admin access?" : "New patient?"}{' '}
                            <Link 
                                to={userType === 'admin' ? "/login?user=patient" : "/register"}
                                className="text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                {userType === 'admin' ? 'Switch to Patient Login' : 'Create an account'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
