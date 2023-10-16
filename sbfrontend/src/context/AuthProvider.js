import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../server/api/user/get';  // Make sure the path is correct
import clientAxios from '../server/clientAxios';
import { getConfig } from '../server/config';
import { sendLogin, depositAmount, withdrawAmount, transferAmount } from '../server/api/user/post';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);

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
                setUser(null);
            }

            setLoading(false);
        };

        authUser();
    }, []);

    const closeSession = () => {
        setUser(null);
        navigate('/');
        localStorage.clear();
    };

    const login = async (email, password) => {
        try {
            const response = await sendLogin({ email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('Response from server:', response.data);
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


    
    const depositMoney = async (amount, accountNumber) => {
        try {
            console.log(user.token);
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await depositAmount({ amount, accountNumber }, token);
            if (response.data && response.data.user) {
                setUser(response.data.user);
                return { success: true, message: 'Deposit successful!' };
            }
            return { success: false, message: response.error || 'Deposit failed.' };
        } catch (error) {
            return { success: false, message: 'An error occurred during deposit.' };
        }
    };
    
    const withdrawMoney = async (amount, accountNumber) => {
        try {
            console.log(user.token);
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await withdrawAmount({ amount, accountNumber }, token);
            if (response.data && response.data.user) {
                setUser(response.data.user);
                return { success: true, message: 'Withdrawal successful!' };
            }
            return { success: false, message: response.error || 'Withdrawal failed.' };
        } catch (error) {
            return { success: false, message: 'An error occurred during withdrawal.' };
        }
    };
    
    const transferMoney = async (amount, originAccountNumber, destEmail, destAccountNumber) => {
        try {
            console.log(user.token);
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token);
            const response = await transferAmount({ amount, originAccountNumber, destEmail, destAccountNumber }, token);
            if (response.data && response.data.user) {
                setUser(response.data.user);
                return { success: true, message: 'Transfer successful!' };
            }
            return { success: false, message: response.error || 'Transfer failed.' };
        } catch (error) {
            return { success: false, message: 'An error occurred during transfer.' };
        }
    };


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

