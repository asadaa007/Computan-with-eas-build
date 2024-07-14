import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const success = await login(id, password);
        if (!success) {
            setError('Invalid credentials.');
        } else {
            setError('');
        }
    };

    const handlePasswordReset = () => {
        navigation.navigate('PasswordReset');
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://timesheet.computan.com/computanLogo.png' }}
                style={styles.logo}
            />
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter ID"
                    placeholderTextColor={colors.secondary}
                    value={id}
                    onChangeText={setId}
                />
                <MaterialCommunityIcons name="account" size={24} color={colors.primary} style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor={colors.secondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <MaterialCommunityIcons name="lock" size={24} color={colors.primary} style={styles.icon} />
            </View>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Get in</Text>
            </Pressable>
            <Pressable onPress={handlePasswordReset}>
                <Text style={styles.passwordReset}>Forgot password?</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.light,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        color: colors.primary,
    },
    icon: {
        marginLeft: 10,
    },
    button: {
        width: '100%',
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.light,
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    passwordReset: {
        color: colors.primary,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: 20,
        textAlign:'left'
    },
});

export default LoginScreen;
