import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LeaveDetailsDropdown from '../../components/LeaveDetailsDropdown';
import { colors } from '../../utils/colors';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const leaveData = [
    {
        date: '2024-05-01',
        status: 'Pending',
        startDate: '2024-05-01',
        endDate: '2024-05-05',
        type: 'Leave',
        reason: 'Flu',
        document: 'sample.pdf',
    },
    {
        date: '2024-04-15',
        status: 'Approved',
        startDate: '2024-04-15',
        endDate: '2024-04-20',
        type: 'Disciplinary Leave',
        reason: 'Family Trip',
        document: 'vacation.pdf',
    },
    {
        date: '2024-04-01',
        status: 'Cancelled',
        startDate: '2024-04-15',
        endDate: '2024-04-20',
        type: 'Leave',
        reason: 'Family Trip',
        document: 'vacation.pdf',
    },
    {
        date: '2024-03-01',
        status: 'Pending',
        startDate: '2024-03-01',
        endDate: '2024-03-05',
        type: 'Leave',
        reason: 'Flu',
        document: 'sample.pdf',
    },
    {
        date: '2024-02-15',
        status: 'Approved',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
        type: 'Disciplinary Leave',
        reason: 'Family Trip',
        document: 'vacation.pdf',
    },
    {
        date: '2024-01-05',
        status: 'Cancelled',
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        type: 'Leave',
        reason: 'Family Trip',
        document: 'vacation.pdf',
    },
    {
        date: '2024-01-01',
        status: 'Cancelled',
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        type: 'Leave',
        reason: 'Family Trip',
        document: 'vacation.pdf',
    },
];

const LeaveScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [isFullDay, setIsFullDay] = useState(true);
    const [reason, setReason] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const leaveTypes = [
        'Leave',
        'Disciplinary Leave',
        'Eid Holiday PK',
        'Hajj Leaves',
        'Marriage Leaves',
        'Maternal Leaves',
        'Miscarriage leave',
        'Paternal Leaves',
    ];

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const onFromDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setShowFromDatePicker(Platform.OS === 'ios');
        setFromDate(currentDate);
    };

    const onToDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || toDate;
        setShowToDatePicker(Platform.OS === 'ios');
        setToDate(currentDate);
    };

    const applyLeave = () => {
        setStatusMessage('Leave Applied');
        setTimeout(() => {
            setStatusMessage('');
            setModalVisible(false);
        }, 2000);
    };

    useEffect(() => {
        if (statusMessage) {

        }
    }, [statusMessage]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.leftCol}>
                    <Text style={styles.remainingLeave}>6</Text>
                    <Text style={styles.remainingTitle}>Remaining Leaves</Text>
                </View>
                <View style={styles.rightCol}>
                    <View style={styles.innerLeft}>
                        <Text style={styles.titleLeave}>Leave Allowance</Text>
                        <Text style={[styles.titleLeave, styles.eid]}>Eid Holiday Allowance</Text>
                        <Text style={styles.titleLeave}>Carried over from 2023</Text>
                        <Text style={styles.titleLeave}>Individual adjustment</Text>
                        <Text style={styles.titleLeave}>Used so far</Text>
                    </View>
                    <View style={styles.innerRight}>
                        <Text style={styles.detailsLeave}>18</Text>
                        <Text style={[styles.detailsLeave, styles.eid]}>2</Text>
                        <Text style={styles.detailsLeave}>3</Text>
                        <Text style={styles.detailsLeave}>0</Text>
                        <Text style={styles.detailsLeave}>15 out of 21</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={styles.bottomContainer}
                data={leaveData}
                renderItem={({ item }) => <LeaveDetailsDropdown leave={item} />}
                keyExtractor={(item) => item.date}
                ListHeaderComponent={() => <Text style={styles.listHeader}>Leave History</Text>}
            />
            <TouchableOpacity style={styles.fab} onPress={openModal}>
                <Ionicons name="add" size={24} color={colors.light} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalHeader}>Leave Type</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={leaveType}
                                        onValueChange={(itemValue) => setLeaveType(itemValue)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Select Leave Type" value="" />
                                        {leaveTypes.map((type, index) => (
                                            <Picker.Item key={index} label={type} value={type} />
                                        ))}
                                    </Picker>
                                </View>
                                <Text style={styles.modalHeader}>Date</Text>
                                <View style={styles.datePickerContainer}>
                                    <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.dateInput}>
                                        <Text>{fromDate.toDateString()}</Text>
                                        <Ionicons name="calendar" size={24} color={colors.primary} />
                                    </TouchableOpacity>
                                    {showFromDatePicker && (
                                        <DateTimePicker
                                            value={fromDate}
                                            mode="date"
                                            display="default"
                                            onChange={onFromDateChange}
                                        />
                                    )}
                                    <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.dateInput}>
                                        <Text>{toDate.toDateString()}</Text>
                                        <Ionicons name="calendar" size={24} color={colors.primary} />
                                    </TouchableOpacity>
                                    {showToDatePicker && (
                                        <DateTimePicker
                                            value={toDate}
                                            mode="date"
                                            display="default"
                                            onChange={onToDateChange}
                                        />
                                    )}
                                </View>
                                <View style={styles.radioContainer}>
                                    <TouchableOpacity onPress={() => setIsFullDay(true)} style={styles.radioButton}>
                                        <Ionicons name={isFullDay ? "radio-button-on" : "radio-button-off"} size={24} color={colors.primary} />
                                        <Text style={styles.radioText}>Full Day</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setIsFullDay(false)} style={styles.radioButton}>
                                        <Ionicons name={!isFullDay ? "radio-button-on" : "radio-button-off"} size={24} color={colors.primary} />
                                        <Text style={styles.radioText}>Half Day</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    placeholder="Reason"
                                    value={reason}
                                    onChangeText={setReason}
                                    style={styles.textInput}
                                    multiline
                                    numberOfLines={4}
                                />
                                <TouchableOpacity style={styles.uploadButton}>
                                    <Text style={styles.uploadButtonText}>Upload Document</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.applyButton} onPress={applyLeave}>
                                    <Text style={styles.applyButtonText}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {statusMessage !== '' && (
                <View style={styles.statusMessage}>
                    <Text style={styles.statusMessageText}>{statusMessage}</Text>
                </View>
            )}
        </View>
    );
};

export default LeaveScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray,
    },
    topContainer: {
        backgroundColor: colors.primary,
        padding: 15,
        paddingBottom:30,
        display: 'flex',
        flexDirection: 'column',
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        elevation:5,
        marginBottom:15,
    },
    leftCol: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: colors.light,
        paddingBottom: 10,
        marginBottom: 10,
    },
    remainingLeave: {
        color: colors.light,
        fontSize: 50,
        fontWeight: '900',
    },
    remainingTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: colors.secondary,
    },
    rightCol: {
        display: 'flex',
        flexDirection: 'row',
    },
    innerLeft: {
        flex: 1,
    },
    innerRight: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
    },
    titleLeave: {
        color: colors.secondary,
        fontSize: 15,
        marginVertical: 5,
    },
    eid: {
        color: colors.light,
    },
    detailsLeave: {
        color: colors.secondary,
        fontSize: 15,
        marginVertical: 5,
    },
    bottomContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.gray3,
    },
    listHeader: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        color: colors.dark,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.light,
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    modalHeader: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        color: colors.dark,
    },
    pickerContainer: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    picker: {
        height: 60,
        width: '100%',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '48%',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    radioText: {
        marginLeft: 5,
        color: colors.dark,
    },
    textInput: {
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: colors.light,
        fontWeight: '700',
    },
    applyButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    applyButtonText: {
        color: colors.light,
        fontWeight: '700',
    },
    statusMessage: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: colors.success,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    statusMessageText: {
        color: colors.light,
        fontWeight: '700',
    },
});
