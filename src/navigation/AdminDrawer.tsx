import React, { useContext, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, Modal, Pressable } from 'react-native';
import AdminDashboard from '../screens/Admin/AdminDashboard';
import EmployeeList from '../screens/Admin/EmployeeList';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { AuthContext } from '../context/AuthContext';
import { profilePics } from '../utils/profilePics';
import { colors } from '../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
    const { user } = useContext(AuthContext);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <View style={styles.container}>
            <Drawer.Navigator
                initialRouteName="AdminDashboard"
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: colors.light,
                    drawerActiveTintColor: colors.primary,
                    drawerLabelStyle: {
                        color: colors.secondary
                    },
                    headerRight: () => (
                        <Pressable onPress={toggleNotifications}>
                            <Ionicons name="notifications" size={24} color={colors.light} style={styles.notificationIcon} />
                        </Pressable>
                    ),
                }}
                drawerContent={(props) => (
                    <CustomDrawerContent {...props}>
                        {user && (
                            <View style={styles.profileContainer}>
                                <Image
                                    source={{ uri: profilePics[user.role] }}
                                    style={styles.profileImage}
                                />
                                <Text style={styles.profileName}>Ali</Text>
                            </View>
                        )}
                    </CustomDrawerContent>
                )}
            >
                <Drawer.Screen
                    name="Dashboard"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Dashboard',
                        drawerIcon: () => (
                            <AntDesign name="home" size={20} color={colors.dark} />
                        )
                    }}
                    component={AdminDashboard} />
                <Drawer.Screen
                    name="EmployeeList"
                    options={{
                        drawerLabel: 'Employee List',
                        title: 'Employee List',
                        drawerIcon: () => (
                            <AntDesign name="team" size={20} color={colors.dark} />
                        )
                    }}
                    component={EmployeeList} />
            </Drawer.Navigator>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showNotifications}
                onRequestClose={toggleNotifications}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.notificationHeader}>
                            <Text style={styles.modalTitle}>Notifications</Text>
                            <Pressable onPress={toggleNotifications} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                        <View style={styles.notficationArea}>
                            <Text>No new notifications</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        color: colors.secondary,
    },
    notificationIcon: {
        marginRight: 10,
        paddingHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: colors.light,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    notificationHeader: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
    },
    notficationArea: {
        flex: 1,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.light,
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.secondary,
        borderRadius: 5,
    },
    closeButtonText: {
        color: colors.light,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AdminDrawer;
