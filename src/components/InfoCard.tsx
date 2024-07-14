import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { profilePics } from '../utils/profilePics';
import userNames from '../utils/userNames';
import { Ionicons } from '@expo/vector-icons';

const InfoCard = () => {
    const employeeName = userNames.employee.name;
    return (
        <View style={styles.infoContainer}>
            <View style={styles.topRow}>
                <View style={styles.textCol}>
                    <Text style={styles.welcomeText}>Welcome back!</Text>
                    <Text style={styles.profileName}>{employeeName}</Text>
                </View>
                <View style={styles.photoCol}>
                    <Image
                        source={{ uri: profilePics.employee }}
                        style={styles.profileImage}
                    />
                </View>

            </View>
            <View style={styles.bottomRow}>
                <View style={styles.timerBar}>
                    <Ionicons name="timer-outline" size={20} color={colors.dark} />
                    <Text style={styles.timerStyle}>00:00:00 </Text>
                </View>
                <Text>You haven't checked in yet. </Text>
                <View style={styles.buttonBar}>
                    <Pressable style={styles.btnIn}>
                        <Text style={styles.btnText}>Check In</Text>
                    </Pressable>
                    <Pressable style={styles.btnOut}>
                        <Text style={styles.btnText}>Check Out</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default InfoCard

const styles = StyleSheet.create({
    infoContainer: {
        // flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 15,
        // height: 220,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.light,
        paddingBottom: 5,
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
        width: 80,
        height: 80,
        borderRadius: 5,
        marginBottom: 5,
        borderWidth: 3,
        borderColor: colors.light,
    },
    timerBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 5,
    },
    timerStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.dark,
    },
    buttonBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    btnIn: {
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '47%',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.light,
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500',
    },
    btnOut: {
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '47%',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.light,
    },
})