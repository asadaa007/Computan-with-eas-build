import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../../utils/colors';

const PasswordResetScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handleResetPassword = () => {
        setResetMessage(`Password reset link sent to ${email}`);
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://timesheet.computan.com/computanLogo.png' }}
                style={styles.logo}
            />
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Name"
                placeholderTextColor={colors.secondary}
                value={name}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.secondary}
                value={email}
                onChangeText={setEmail}
            />
            <Pressable style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Request Reset</Text>
            </Pressable>
            {resetMessage ? <Text style={styles.resetMessage}>{resetMessage}</Text> : null}
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
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        color: colors.primary,
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
    resetMessage: {
        marginTop: 20,
        color: colors.primary,
    },
});

export default PasswordResetScreen;
