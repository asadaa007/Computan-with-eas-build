import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDrawer from './AdminDrawer';

const Stack = createStackNavigator();

const AdminStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
        </Stack.Navigator>
    );
};

export default AdminStack;
