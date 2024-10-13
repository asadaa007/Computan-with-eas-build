import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const users = {
    admin: { id: 'a', password: 'a', role: 'admin' },
    manager: { id: 'm', password: 'm', role: 'manager' },
    hrmanager: { id: 'h', password: 'h', role: 'hrmanager' },
    employee: { id: 'e', password: 'e', role: 'employee' }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        loadUser();
    }, []);

    const login = async (id, password) => {
        const foundUser = Object.values(users).find(
            user => user.id === id && user.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            await AsyncStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        } else {
            return false;
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
