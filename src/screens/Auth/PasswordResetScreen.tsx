import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../../utils/colors';
import forget from '../../assets/forget.png';
import InputUser from '../../components/InputUser';
import InputEmail from '../../components/InputEmail';
import PrimaryBTN from '../../components/PrimaryBTN';
import InputID from '../../components/InputID';

const PasswordResetScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setID] = useState ('');
    const [resetMessage, setResetMessage] = useState('');

    const handleResetPassword = () => {
        setResetMessage(`Password reset link sent to ${email}`);
    };

    return (
        <View style={styles.container}>
            <Image
                // source={{ uri: 'https://timesheet.computan.com/computanLogo.png' }}
                source={forget}
                style={styles.logo}
            />
            <Text style={styles.title}>Reset Password</Text>
            <InputID
            placeHolder={'Enter ID'}
            value={id}
            onChangeText={setID}
            />
            <InputUser
            placeHolder={'Enter your name'}
            value={name}
            onChangeText={setName}
            />
            <InputEmail
            placeHolder={'Enter Email'}
            value={email}
            onChangeText={setEmail}
            />
            <PrimaryBTN
            title={'Request Reset'}
            onPress={handleResetPassword}
            />
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
        width: 330,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 20,
        color:colors.primary,
    },
    resetMessage: {
        marginTop: 20,
        color: colors.primary,
    },
});

export default PasswordResetScreen;
