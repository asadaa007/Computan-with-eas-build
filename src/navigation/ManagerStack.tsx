import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManagerDrawer from './ManagerDrawer';

const Stack = createStackNavigator();

const ManagerStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ManagerDrawer" component={ManagerDrawer} />
        </Stack.Navigator>
    );
};

export default ManagerStack;
