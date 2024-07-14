import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../utils/colors';
import { profilePics } from '../../utils/profilePics';
import userNames from '../../utils/userNames';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import MenuList from '../../components/MenuList';

const EmployeeDashboard = () => {
    const employeeName = userNames.employee.name;

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

    const navigation = useNavigation();

    const handleAttendance = () => {
        navigation.navigate('AttendanceScreen');
    };
    const handleLeaves = () => {
        navigation.navigate('LeaveScreen');
    };
    const handleNews = () => {
        navigation.navigate('Announcements');
    };
    const handleOverTime = () => {
        navigation.navigate('OverTimeScreen');
    };
    const handlePaySlip = () => {
        navigation.navigate('PaySlipScreen');
    };
    const handleTeam = () => {
        navigation.navigate('TeamScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topRow}>
                    <View style={styles.photoCol}>
                        <Image
                            source={{ uri: profilePics.employee }}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.textCol}>
                        <Text style={styles.welcomeText}>Welcome back!</Text>
                        <Text style={styles.profileName}>{employeeName}</Text>
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
            <ScrollView style={styles.bottomContainer}>
                <View style={styles.btnRow}>
                    <MenuList iconNeme={'filetext1'} BtnName={'Attendance'} OnPress={handleAttendance} />
                    <MenuList iconNeme={'calendar'} BtnName={'Leaves'} OnPress={handleLeaves} />
                    <MenuList iconNeme={'notification'} BtnName={'Announcements'} OnPress={handleNews} />
                    <MenuList iconNeme={'clockcircleo'} BtnName={'Over Time'} OnPress={handleOverTime} />
                    <MenuList iconNeme={'pptfile1'} BtnName={'PaySlip'} OnPress={handlePaySlip} />
                    <MenuList iconNeme={'team'} BtnName={'Team'} OnPress={handleTeam} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray3
    },
    topContainer: {
        position:'relative',
        zIndex:1,
        backgroundColor: colors.primary,
        padding: 25,
        paddingBottom: 40,
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
        fontSize: 20,
        fontWeight: '500',
        color: colors.light,
    },
    profileName: {
        fontSize: 25,
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
    btnPressed: {
        backgroundColor: colors.success,
        borderColor: colors.success,
    },
    btnPressedOut: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
    },
    bottomContainer: {
        position:'relative',
        zIndex:2,
        flex: 2,
    },
    btnRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        padding:15,
    },
});

export default EmployeeDashboard;