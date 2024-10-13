import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AuthStack;
