import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { Picker } from '@react-native-picker/picker';

const AttendanceScreen = () => {
    const [selectedMonth, setSelectedMonth] = useState('May');
    const [selectedYear, setSelectedYear] = useState('2024');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = ['2023', '2024', '2025', '2026', '2027'];


    const currentMonthDays = [
        { day: 1, status: 'present' },
        { day: 2, status: 'absent' },
        { day: 3, status: 'present' },
        { day: 4, status: 'present' },
        { day: 5, status: 'present' },
        { day: 6, status: 'present' },
        { day: 7, status: 'present' },
        { day: 8, status: 'present' },
        { day: 9, status: 'present' },
        { day: 10, status: 'present' },
        { day: 11, status: 'absent' },
        { day: 12, status: 'present' },
        { day: 13, status: 'present' },
        { day: 14, status: 'present' },
        { day: 15, status: 'absent' },
        { day: 16, status: 'present' },
        { day: 17, status: 'present' },
        { day: 18, status: 'absent' },
        { day: 19, status: 'present' },
        { day: 20, status: 'present' },
        { day: 21, status: 'present' },
        { day: 22, status: 'present' },
        { day: 23, status: 'absent' },
        { day: 24, status: 'present' },
        { day: 25, status: 'present' },
        { day: 26, status: 'present' },
    ];

    const handleMonthFilter = (month) => {
        setSelectedMonth(month);
    };

    const handleYearFilter = (year) => {
        setSelectedYear(year);
    };

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month - 1, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(months.indexOf(selectedMonth) + 1, parseInt(selectedYear));
    const firstDayOfMonth = getFirstDayOfMonth(months.indexOf(selectedMonth) + 1, parseInt(selectedYear));

    const absentDays = currentMonthDays.filter(day => day.status === 'absent').map(day => {
        const date = new Date(selectedYear, months.indexOf(selectedMonth), day.day);
        return {
            day: day.day,
            weekday: weekdays[date.getDay()],
            date: date.toDateString(),
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Ionicons name="filter" size={24} color={colors.primary} style={styles.filterIcon} />
                <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleMonthFilter(itemValue)}
                >
                    {months.map(month => (
                        <Picker.Item key={month} label={month} value={month} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleYearFilter(itemValue)}
                >
                    {years.map(year => (
                        <Picker.Item key={year} label={year} value={year} />
                    ))}
                </Picker>
            </View>
            <View style={styles.calendarContainer}>
                <Text style={styles.currentMonthText}>Current Month: {selectedMonth} {selectedYear}</Text>
                <View style={styles.weekdaysContainer}>
                    {weekdays.map(day => (
                        <Text key={day} style={styles.weekday}>{day}</Text>
                    ))}
                </View>
                <View style={styles.calendar}>
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <View key={`empty-${index}`} style={styles.dayContainer} />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, index) => {
                        const day = index + 1;
                        const status = currentMonthDays.find(d => d.day === day)?.status || 'unknown';
                        return (
                            <View key={day} style={styles.dayContainer}>
                                <Text style={[styles.day,
                                status === 'present' ? styles.present :
                                    status === 'absent' ? styles.absent :
                                        styles.unknown]}>
                                    {day}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <FlatList
                data={absentDays}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.absentTitle}>You were absent:</Text>
                        <Text style={styles.absentText}> {item.date}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingRight:15,
        backgroundColor: colors.gray3,
    },
    headerText: {
        fontSize: 20,
        color: colors.secondary,
        fontWeight: '700',
    },
    calendarContainer: {
        backgroundColor: colors.light,
        paddingVertical: 20,
        marginBottom: 10,
        borderRadius: 15,
        height: 'auto',
        borderColor:colors.primary,
        borderLeftWidth:5,
        borderRightWidth:5,
    },
    currentMonthText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '900',
        paddingHorizontal:20,
        textAlign:'center',
        color:colors.primary,
    },
    weekdaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor:colors.primary,
        paddingHorizontal:20,
    },
    weekday: {
        width: '14.28%',
        textAlign: 'center',
        padding: 5,
        fontWeight: 'bold',
        color:colors.light,
    },
    calendar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal:20,
    },
    dayContainer: {
        width: '14.28%',
        alignItems: 'center',
        marginBottom: 10,
    },
    day: {
        width: '80%',
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
    },
    present: {
        backgroundColor: colors.success,
        color: colors.white,
    },
    absent: {
        backgroundColor: colors.danger,
        color: colors.white,
    },
    unknown: {
        backgroundColor: colors.light,
        color: colors.white,
    },
    filterContainer: {
        backgroundColor:colors.light,
        paddingHorizontal:10,
        borderRadius:15,
        borderLeftWidth:5,
        borderRightWidth:5,
        borderColor:colors.primary,
        elevation:5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    filterIcon: {
        marginRight: 10,
    },
    picker: {
        height: 50,
        flex: 1,
        color: colors.primary,
    },
    item: {
        backgroundColor: colors.light,
        padding: 20,
        paddingVertical:30,
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:15,
        borderLeftWidth:5,
        borderColor:colors.primary,
        elevation:5,
    },
    absentTitle: {
        fontSize: 16,
        color: colors.primary,
        marginRight: 10,
        fontWeight: '700',
    },
    absentText: {
        fontSize: 16,
        color: colors.secondary,
    },
});

export default AttendanceScreen;
