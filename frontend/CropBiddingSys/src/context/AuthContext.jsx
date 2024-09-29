import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to login
    const login = async (credentials) => {
        try {
            // Implement your login logic here
            // ...
            // On successful login, set the user
            setUser({ id: '123', email: 'user@example.com', role: 'farmer' });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Function to logout
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
