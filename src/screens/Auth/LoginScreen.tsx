import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../utils/colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import InputID from '../../components/InputID';
import InputPass from '../../components/InputPass';
import PrimaryBTN from '../../components/PrimaryBTN';
import SecondaryBTN from '../../components/SecondaryBTN';
import loginArt from '../../assets/login.png';

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
                // source={{ uri: 'https://timesheet.computan.com/computanLogo.png' }}
                source={loginArt}
                style={styles.logo}
            />
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <InputID
            placeHolder={'Enter ID'}
            value={id}
            onChangeText={setId}
            />
            <InputPass
            placeHolder={'Enter Password'}
            value={password}
            onChangeText={setPassword}
            />
            <PrimaryBTN
                onPress={handleLogin}
                title={'Get In'}
            />
            <SecondaryBTN
            onPress={handlePasswordReset}
            title={'Forget Password?'}
            />
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
        width: 350,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 20,
        color:colors.primary,
    },
   
    error: {
        color: colors.danger,
        marginBottom: 20,
    },
});

export default LoginScreen;
