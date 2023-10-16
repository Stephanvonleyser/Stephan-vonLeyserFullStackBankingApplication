import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../server/api/user/get';  // Make sure the path is correct
import clientAxios from '../server/clientAxios';
import { getConfig } from '../server/config';
import { sendLogin } from '../server/api/user/post';


export const AuthContext = createContext();
export const UserContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const { data } = await getUserProfile(config);
                setAuth(data);
                navigate('/home');
            } catch (error) {
                setAuth({});
            }

            setLoading(false);
        };

        authUser();
    }, [navigate]);

    const closeSession = () => {
        setAuth({});
        navigate('/');
        localStorage.clear();
    };

    const login = async (email, password) => {
        try {
            const response = await sendLogin({ email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setAuth({
                    token: response.data.token,
                    user: response.data.user
                });
                navigate('/home');
                return { success: true };
            } else {
                return { success: false, message: 'Invalid email or password' };
            }
        } catch (error) {
            return { success: false, message: error.response ? error.response.data.message : 'An error occurred. Please try again later.' };
        }
    };

    const logout = () => {
        closeSession();
    };

    const makeTransaction = async (endpoint, payload) => {
        try {
            const config = getConfig(auth.token);  
            const { data } = await clientAxios.post(endpoint, payload, config);
            setAuth(data.user);  
            return { success: true, message: `${endpoint.split('/')[2]} successful!` };
        } catch (error) {
            return { success: false, message: error.response.data.message || `${endpoint.split('/')[2]} failed.` };
        }
    };
    
    const depositMoney = (amount, accountNumber) => 
        makeTransaction('/account/deposit', { amount, accountNumber });
    
    const withdrawMoney = (amount, accountNumber) => 
        makeTransaction('/account/withdraw', { amount, accountNumber });
    
    const transferMoney = (amount, originAccountNumber, destEmail, destAccountNumber) => 
        makeTransaction('/account/transfer', { amount, originAccountNumber, destEmail, destAccountNumber });




    const authContextValue = {
        setAuth,
        auth,
        loading,
        closeSession,
        login,
        logout,
        depositMoney,
        withdrawMoney,
        transferMoney  
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <UserContext.Provider value={auth}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useUser() {
    return useContext(UserContext);
}
