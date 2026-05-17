import { createContext, use, useContext, useEffect, useState } from "react"
import { login as loginApi, register as registerApi, getProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    // Load User on mount
    useEffect(() => {
        if(token){
            loadUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    // Load User
    const loadUser = async () => {
        try {
            const response = await getProfile();
            setUser(response.data);
        } catch (error) {
            console.log("Failed to load user", error);
            logOut();
        } finally {
            setLoading(false);
        }
    };

    // register a user
    const register = async (userData) => {
        try {
            const response = await registerApi(userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);

            navigate('/profile');

            return { success : true};
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    // login for a user
    const login = async (userData) => {
        try {
            const response = await loginApi(userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            
            navigate('/profile');

            return { success : true}
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);

        navigate('/login');
    };

    return (
        <AuthContext.Provider 
            value={{ user, loading, login, register, logOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

