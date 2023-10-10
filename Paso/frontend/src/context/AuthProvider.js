import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../server/api/user/get';  // Make sure the path is correct

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

    const login = (user) => {
        // Logic for setting user and token in localStorage
    };

    const logout = () => {
        closeSession();
    };

    const depositMoney = async (amount, accountNumber) => {
        try {
            const config = getConfig(user.token);  
            const { data } = await clientAxios.post('/account/deposit', { amount, accountNumber }, config);
            setAuth(data.user);  
            return { success: true, message: 'Deposit successful!' };
        } catch (error) {
            return { success: false, message: error.response.data.message || 'Deposit failed.' };
        }
    };

    const withdrawMoney = async (amount, accountNumber) => {
        try {
            const config = getConfig(user.token);  
            const { data } = await clientAxios.post('/account/withdraw', { amount, accountNumber }, config);
            setAuth(data.user);  
            return { success: true, message: 'Withdrawal successful!' };
        } catch (error) {
            return { success: false, message: error.response.data.message || 'Withdrawal failed.' };
        }
    };

    const transferMoney = async (amount, originAccountNumber, destEmail, destAccountNumber) => {
        try {
            const config = getConfig(user.token);  
            const { data } = await clientAxios.post('/account/transfer', { amount, originAccountNumber, destEmail, destAccountNumber }, config);
            setAuth(data.user);  
            return { success: true, message: 'Transfer successful!' };
        } catch (error) {
            return { success: false, message: error.response.data.message || 'Transfer failed.' };
        }
    };




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
