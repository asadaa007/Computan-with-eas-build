import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeDrawer from './EmployeeDrawer';

const Stack = createStackNavigator();

const EmployeeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EmployeeDrawer" component={EmployeeDrawer} />
        </Stack.Navigator>
    );
};

export default EmployeeStack;
