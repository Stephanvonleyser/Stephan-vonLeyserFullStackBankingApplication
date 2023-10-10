import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        // Logic for logging in and setting the user object...
        setCurrentUser(user);
    };

    const logout = () => {
        // Logic for logging out...
        setCurrentUser(null);
    };

    const authContextValue = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}