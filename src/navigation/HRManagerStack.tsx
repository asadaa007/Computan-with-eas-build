import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HRManagerDrawer from './HRManagerDrawer';

const Stack = createStackNavigator();

const HRManagerStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ManagerDrawer" component={HRManagerDrawer} />
        </Stack.Navigator>
    );
};

export default HRManagerStack;
