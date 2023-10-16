import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../server/api/user/get';  // Make sure the path is correct
import clientAxios from '../server/clientAxios';
import { getConfig } from '../server/config';
import { sendLogin } from '../server/api/user/post';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});
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
                setUser(data);
                navigate('/home');
            } catch (error) {
                setUser({});
            }

            setLoading(false);
        };

        authUser();
    }, [navigate]);

    const closeSession = () => {
        setUser({});
        navigate('/');
        localStorage.clear();
    };

    const login = async (email, password) => {
        try {
            const response = await sendLogin({ email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
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
            const config = getConfig(user.token);  
            const { data } = await clientAxios.post(endpoint, payload, config);
            setUser(data.user);  
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
        setUser,
        user,
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
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

