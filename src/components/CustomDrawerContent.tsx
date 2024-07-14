import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../utils/colors';
import { profilePics } from '../utils/profilePics';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import userNames from '../utils/userNames';
import { useNavigation } from '@react-navigation/native';


const CustomDrawerContent = (props) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            {user && (
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: profilePics[user.role] }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>{userNames[user.role].name}</Text>
                    <Text style={styles.profileDesignation}>{userNames[user.role].designation}</Text>
                </View>
            )}
            <View style={styles.drawerItemListContainer}>
                <DrawerItemList {...props} />
            </View>
            <View style={styles.footer}>
                <View style={styles.logoutContainer}>
                    <Pressable style={styles.btnReset}>
                        <Text style={styles.text}>Password Reset</Text>
                        <Feather name="arrow-up-right" size={20} color={colors.primary} />
                    </Pressable>
                    <Pressable style={styles.btn} onPress={logout}>
                        <MaterialCommunityIcons name="logout" size={24} color={colors.primary} />
                        <Text style={styles.text}>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: colors.primary,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth:3,
        borderColor:colors.light,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.secondary,
    },
    profileDesignation: {
        fontSize: 16,
        color: colors.light,
    },
    drawerItemListContainer: {
        flex: 4,
        backgroundColor: colors.light,
        paddingTop: 10,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.light,
    },
    logoutContainer: {
        padding: 20,
    },
    btnReset: {
        paddingVertical: 15,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 20,
    },
});

export default CustomDrawerContent;
