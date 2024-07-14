import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import ManagerStack from './ManagerStack';
import EmployeeStack from './EmployeeStack';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                user.role === 'admin' ? (
                    <Stack.Screen name="Admin" component={AdminStack} />
                ) : user.role === 'manager' ? (
                    <Stack.Screen name="Manager" component={ManagerStack} />
                ) : (
                    <Stack.Screen name="Employee" component={EmployeeStack} />
                )
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
