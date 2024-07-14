import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../utils/colors';
import { profilePics } from '../../utils/profilePics';
import userNames from '../../utils/userNames';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = () => {
    const adminName = userNames.admin.name;

    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [timer, setTimer] = useState('00:00:00');
    const [totalTime, setTotalTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const timerRef = useRef(null);
    const totalTimeRef = useRef(totalTime);

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const handleCheckIn = () => {
        if (intervalId) return;

        const startTime = Date.now();
        const startTotalTime = Date.now() - totalTimeRef.current;

        timerRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
            setTimer(`${hours}:${minutes}:${seconds}`);

            const totalElapsedTime = Date.now() - startTotalTime;
            totalTimeRef.current = totalElapsedTime;
            const totalHours = String(Math.floor(totalElapsedTime / 3600000)).padStart(2, '0');
            const totalMinutes = String(Math.floor((totalElapsedTime % 3600000) / 60000)).padStart(2, '0');
            const totalSeconds = String(Math.floor((totalElapsedTime % 60000) / 1000)).padStart(2, '0');
            setTotalTime(totalTimeRef.current);
        }, 1000);

        setIntervalId(timerRef.current);
        setIsCheckedIn(true);
    };

    const handleCheckOut = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setIsCheckedIn(false);
    };

    const renderStatusMessage = () => {
        if (!isCheckedIn && totalTimeRef.current === 0) {
            return <Text>You haven't checked in yet.</Text>;
        } else if (isCheckedIn) {
            return <Text>You have checked in.</Text>;
        } else {
            return <Text>You are away.</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topRow}>
                    <View style={styles.photoCol}>
                        <Image
                            source={{ uri: profilePics.admin }}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.textCol}>
                        <Text style={styles.welcomeText}>Welcome back!</Text>
                        <Text style={styles.profileName}>{adminName}</Text>
                    </View>
                </View>
                <View style={styles.bottomRow}>
                    <View style={styles.timerBar}>
                        <Ionicons name="timer-outline" size={20} color={colors.dark} />
                        <Text style={styles.timerStyle}>{timer}</Text>
                        <Text style={styles.totalStyle}>
                            Spent Time: {`${String(Math.floor(totalTime / 3600000)).padStart(2, '0')}:${String(Math.floor((totalTime % 3600000) / 60000)).padStart(2, '0')}:${String(Math.floor((totalTime % 60000) / 1000)).padStart(2, '0')}`}
                        </Text>
                    </View>
                    {renderStatusMessage()}
                    <View style={styles.buttonBar}>
                        <Pressable
                            style={styles.btn}
                            onPress={handleCheckIn}
                            disabled={intervalId !== null}
                        >
                            <Text style={styles.btnText}>Check In</Text>
                        </Pressable>
                        <Pressable
                            style={styles.btn}
                            onPress={handleCheckOut}
                            disabled={!intervalId}
                        >
                            <Text style={styles.btnText}>Check Out</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray3
    },
    topContainer: {
        backgroundColor: colors.primary,
        padding: 25,
        paddingBottom: 50,
        elevation: 5,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:10,
        borderBottomWidth: 1,
        borderColor: colors.light,
        paddingBottom: 5,
        marginBottom: 15,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.light,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.secondary,
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginBottom: 5,
        borderWidth: 3,
        borderColor: colors.light,
    },
    timerBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    timerStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.dark,
    },
    totalStyle: {
        color: colors.light,
        fontSize: 20,
        position:'absolute',
        right:0,
    },
    buttonBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    btn: {
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '47%',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.light,
        elevation: 5,
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500',
    },
});

export default AdminDashboard;
