import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import ManagerStack from './ManagerStack';
import HRManagerStack from './HRManagerStack'
import EmployeeStack from './EmployeeStack';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: route.name !== 'Auth',
            headerStyle: {
                backgroundColor: '#eeb85e', 
                shadowColor: 'transparent',
                height:25,
              },
              headerTintColor: '#eeb85e',
          })}>
            {user ? (
                user.role === 'admin' ? (
                    <Stack.Screen name="Admin" component={AdminStack} />
                ) : user.role === 'manager' ? (
                    <Stack.Screen name="Manager" component={ManagerStack} />
                ) : user.role === 'hrmanager' ? (
                    <Stack.Screen name="HRManager" component={HRManagerStack} />
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
