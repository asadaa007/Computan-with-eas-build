import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, Button, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { Picker } from '@react-native-picker/picker';

const teamData = [
    { id: '1', name: 'Hassan Hashmi', designation: 'Team Lead', calendarType: 'PK, Holiday Calendar', shiftStartTime: '03:00 PM', shiftEndTime: '02:00 AM', profilePhoto: 'https://www.computan.com/hubfs/Hassan-Hashmi.jpg' },
    { id: '2', name: 'Aleksandar Mitic', designation: 'Fullstack Developer', calendarType: 'USA, Holiday Calendar', shiftStartTime: '03:00 PM', shiftEndTime: '11:00 PM', profilePhoto: 'https://www.computan.com/hubfs/team/amitic.png' },
    { id: '3', name: 'Sajjad Kahn', designation: 'FrontEnd Developer', calendarType: 'PK, Holiday Calendar', shiftStartTime: '12:00 PM', shiftEndTime: '09:00 PM', profilePhoto: 'https://www.computan.com/hubfs/Sajjad%20Ali.jpg' },
    { id: '4', name: 'Usman Akhtar', designation: 'Team Lead', calendarType: 'USA, Holiday Calendar', shiftStartTime: '05:00 PM', shiftEndTime: '01:00 AM', profilePhoto: 'https://www.computan.com/hubfs/team/Usman-Akhtar.jpeg' },
    { id: '5', name: 'Asad Ur Rehman', designation: 'FrontEnd Developer', calendarType: 'PK, Holiday Calendar', shiftStartTime: '05:00 PM', shiftEndTime: '01:00 AM', profilePhoto: 'https://www.computan.com/hubfs/asad%20ur%20rehman.jpg' },
    { id: '6', name: 'Hassan Durrani', designation: 'FrontEnd Developer', calendarType: 'PK, Holiday Calendar', shiftStartTime: '12:00 PM', shiftEndTime: '09:00 PM', profilePhoto: 'https://www.computan.com/hubfs/durrani-pic.jpg' },
];

const TeamList = () => {
    const [selectedCalendar, setSelectedCalendar] = useState('All');
    const [selectedMember, setSelectedMember] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const filteredTeamData = teamData.filter(member => {
        if (selectedCalendar === 'All') {
            return true;
        }
        return member.calendarType.includes(selectedCalendar);
    });

    const handleMemberPress = (member) => {
        setSelectedMember(member);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.teamName}>Nairobi Hippos Team</Text>
                <Text style={styles.managerName}>Tech: WordPress</Text>
            </View>
            <View style={styles.filterContainer}>
                <Ionicons name="filter" size={24} color={colors.primary} style={styles.filterIcon} />
                <Picker
                    selectedValue={selectedCalendar}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCalendar(itemValue)}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="PK, Holiday Calendar" value="PK" />
                    <Picker.Item label="USA, Holiday Calendar" value="USA" />
                </Picker>
            </View>
            <FlatList
                data={filteredTeamData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleMemberPress(item)}>
                        <View style={styles.teamMember}>
                            <View style={styles.nameContainer}>
                                <View style={styles.statusLight} />
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                            <Text style={styles.designation}>{item.designation}</Text>
                            <Text style={styles.calendarType}>Calendar Type: {item.calendarType}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {selectedMember && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={{ uri: selectedMember.profilePhoto }} style={styles.profilePhoto} />
                            <Text style={styles.modalName}>{selectedMember.name}</Text>
                            <Text style={styles.modalDesignation}>{selectedMember.designation}</Text>
                            <Text style={styles.modalCalendarType}>Calendar Type: {selectedMember.calendarType}</Text>
                            <Text style={styles.modalShiftTime}>Shift time: {selectedMember.shiftStartTime} - {selectedMember.shiftEndTime}</Text>
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.msgBtn} onPress={() => {/* handle send message action */}} >
                                <Ionicons name="chatbubbles" size={24} color={colors.light}/>
                                </Pressable>
                                <Pressable style={styles.msgBtn} onPress={() => setModalVisible(false)} >
                                <Ionicons name="close" size={24} color={colors.light} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

export default TeamList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray3,
    },
    header: {
        backgroundColor: colors.primary,
        paddingTop: 20,
        paddingBottom: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        marginBottom: 20,
        alignItems: 'center',
        elevation:5,
    },
    teamName: {
        color: colors.light,
        fontSize: 24,
        fontWeight: 'bold',
    },
    managerName: {
        color: colors.gray2,
        fontSize: 16,
        marginTop: 5,
    },
    filterContainer: {
        backgroundColor:colors.light,
        borderRadius:15,
        borderLeftWidth:5,
        borderRightWidth:5,
        borderColor:colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal:10,
        padding:5,
        marginRight:15,
        elevation:5,
    },
    filterIcon: {
        marginRight: 10,
    },
    picker: {
        height: 50,
        flex: 1,
        color: colors.primary,
    },
    teamMember: {
        backgroundColor: colors.light,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderLeftColor: colors.primary,
        borderLeftWidth: 5,
        elevation: 5,
        marginHorizontal:10,
        marginRight:15,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    statusLight: {
        width: 10,
        height: 10,
        backgroundColor: colors.success,
        borderRadius: 5,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    designation: {
        fontSize: 16,
        color: colors.gray2,
    },
    calendarType: {
        fontSize: 14,
        color: colors.lightGray,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: colors.light,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    modalName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    modalDesignation: {
        fontSize: 18,
        color: colors.secondary,
        marginBottom: 10,
    },
    modalCalendarType: {
        fontSize: 16,
        color: colors.gray2,
        marginBottom: 10,
    },
    modalShiftTime: {
        fontSize: 16,
        color: colors.gray2,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    msgBtn:{
        padding:10,
        borderRadius:10,
        backgroundColor:colors.primary,
    },
    btnText:{
        color:colors.light,
    }
});
