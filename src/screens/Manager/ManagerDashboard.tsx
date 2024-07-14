import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { colors } from '../../utils/colors';
import { profilePics } from '../../utils/profilePics';
import userNames from '../../utils/userNames';
import { Ionicons } from '@expo/vector-icons';


const ManagerDashboard = () => {
    const managerName = userNames.manager.name;

    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [timer, setTimer] = useState('00:00:00');
    const [totalTime, setTotalTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const timerRef = useRef(null);
    const totalTimeRef = useRef(totalTime);

    const employeeData = [
        { id: '1', name: 'Hassan Hashmi', designation: 'Team Lead', calendarType: 'PK, Holiday Calendar', shiftStartTime: '03:00 PM', shiftEndTime: '02:00 AM',checkInTime: '09:00 AM', checkOutTime: '06:00 PM', img: 'https://www.computan.com/hubfs/Hassan-Hashmi.jpg' },
        { id: '2', name: 'Aleksandar Mitic', designation: 'Fullstack Developer', calendarType: 'USA, Holiday Calendar', shiftStartTime: '03:00 PM', shiftEndTime: '11:00 PM',checkInTime: '09:00 AM', checkOutTime: '06:00 PM', img: 'https://www.computan.com/hubfs/team/amitic.png' },
        { id: '3', name: 'Sajjad Kahn', designation: 'FrontEnd Developer', calendarType: 'PK, Holiday Calendar', shiftStartTime: '12:00 PM', shiftEndTime: '09:00 PM',checkInTime: '09:00 AM', checkOutTime: '06:00 PM', img: 'https://www.computan.com/hubfs/Sajjad%20Ali.jpg' },
        { id: '4', name: 'Usman Akhtar', designation: 'Team Lead', calendarType: 'USA, Holiday Calendar', shiftStartTime: '05:00 PM', shiftEndTime: '01:00 AM',checkInTime: '09:00 AM', checkOutTime: '06:00 PM', img: 'https://www.computan.com/hubfs/team/Usman-Akhtar.jpeg' },
        { id: '5', name: 'Asad Ur Rehman', designation: 'FrontEnd Developer', calendarType: 'PK, Holiday Calendar', shiftStartTime: '05:00 PM', shiftEndTime: '01:00 AM',checkInTime: '09:00 AM', checkOutTime: '06:00 PM', img: 'https://www.computan.com/hubfs/asad%20ur%20rehman.jpg' },
        { id: '6', name: 'Hassan Durrani', designation: 'FrontEnd Developer', calendarType: 'PK, Holiday Calendar', shiftStartTime: '12:00 PM', shiftEndTime: '09:00 PM',checkInTime: '09:00 AM', checkOutTime: '06:00 PM', img: 'https://www.computan.com/hubfs/durrani-pic.jpg' },
    ];

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

    const handleTeam = () => {
        navigation.navigate('TeamsList');
    };

    const renderEmployeeItem = ({ item }) => (
        <View style={styles.employeeItem}>
            <Image source={{ uri: item.img }} style={styles.employeeImage} />
            <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.employeeDesignation}>{item.designation}</Text>
                <Text style={styles.checkInOutTime}>
                    Check-in: {item.checkInTime} 
                </Text>
                <Text style={styles.checkInOutTime}>
                Check-out: {item.checkOutTime}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topRow}>
                    <View style={styles.photoCol}>
                        <Image
                            source={{ uri: profilePics.manager }}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.textCol}>
                        <Text style={styles.welcomeText}>Welcome back!</Text>
                        <Text style={styles.profileName}>{managerName}</Text>
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
            <View style={styles.bottomContainer}>
                <View style={styles.flatListHeader}>
                    <Text style={styles.flatListHeaderText}>WordPress Team</Text>
                    <Pressable onPress={handleTeam}>
                        <Text>View All</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={employeeData}
                    renderItem={renderEmployeeItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray3,
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
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.light,
        paddingBottom: 5,
        marginBottom: 15,
        gap:10,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timerStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.dark,
        marginLeft: 10,
    },
    totalStyle: {
        color: colors.light,
        fontSize: 20,
        position: 'absolute',
        right: 10,
    },
    buttonBar: {
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
    bottomContainer: {
        flex: 2,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    flatListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    flatListHeaderText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.dark,
    },
    flatListContent: {
        flexGrow: 1,
    },
    employeeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: colors.light,
        padding: 10,
        borderRadius: 15,
        width: 280,
        maxHeight: 120,
        borderLeftWidth:5,
        borderColor:colors.primary,
        elevation:5,
    },
    employeeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    employeeDetails: {
        flex: 1,
    },
    employeeName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    employeeDesignation: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
    },
    checkInOutTime: {
        fontSize: 12,
        color: colors.dark,
    },
});

export default ManagerDashboard;
