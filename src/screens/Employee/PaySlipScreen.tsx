import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { Picker } from '@react-native-picker/picker';

// Sample data for demonstration
const samplePayslips = [
    { id: '1', month: 'January 2023', amount: 5000, deductions: 500, netAmount: 4500 },
    { id: '2', month: 'February 2023', amount: 5200, deductions: 600, netAmount: 4600 },
    { id: '4', month: 'March 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '5', month: 'April 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '6', month: 'May 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '7', month: 'June 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '8', month: 'July 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '9', month: 'August 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '10', month: 'September 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    { id: '11', month: 'October 2024', amount: 5100, deductions: 550, netAmount: 4550 },
    // Add more payslip data as needed
];

const PaySlipScreen = () => {
    const [payslips, setPayslips] = useState([]);
    const [filteredPayslips, setFilteredPayslips] = useState([]);
    const [filterMonth, setFilterMonth] = useState('All');
    const [filterYear, setFilterYear] = useState('All');

    useEffect(() => {
        fetchPayslips();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [payslips, filterMonth, filterYear]);

    const fetchPayslips = () => {
        setPayslips(samplePayslips);
    };

    const applyFilter = () => {
        let filtered = payslips;

        if (filterMonth !== 'All') {
            filtered = filtered.filter(payslip => payslip.month === filterMonth);
        }

        if (filterYear !== 'All') {
            filtered = filtered.filter(payslip => payslip.month.includes(filterYear));
        }

        setFilteredPayslips(filtered);
    };

    const renderPayslip = ({ item }) => (
        <TouchableOpacity onPress={() => handlePayslipPress(item)}>
            <View style={styles.payslip}>
                <Text style={styles.month}>{item.month}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detail}>Gross Pay: ${item.amount}</Text>
                    <Text style={styles.detail}>Deductions: ${item.deductions}</Text>
                    <Text style={styles.detail}>Net Pay: ${item.netAmount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const handlePayslipPress = (payslip) => {
        // Handle the press event, e.g., navigate to detailed view or show more details
        Alert.alert('Payslip Details', `Month: ${payslip.month}\nAmount: $${payslip.amount}\nDeductions: $${payslip.deductions}\nNet Amount: $${payslip.netAmount}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Payslips</Text>
            <View style={styles.filterContainer}>
            <Ionicons name="filter" size={24} color={colors.primary} style={styles.filterIcon} />
                <Picker
                    selectedValue={filterMonth}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFilterMonth(itemValue)}
                >
                    <Picker.Item label="All Months" value="All" />
                    <Picker.Item label="January" value="January" />
                    <Picker.Item label="February" value="February" />
                    <Picker.Item label="March" value="March" />
                    {/* Add more months as needed */}
                </Picker>
                <Picker
                    selectedValue={filterYear}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFilterYear(itemValue)}
                >
                    <Picker.Item label="All Years" value="All" />
                    <Picker.Item label="2024" value="2024" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2022" value="2022" />
                    {/* Add more years as needed */}
                </Picker>
            </View>
            <FlatList
                data={filteredPayslips}
                renderItem={renderPayslip}
                keyExtractor={item => item.id}
                style={styles.list}
            />
        </View>
    );
};

export default PaySlipScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray3,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
        textAlign: 'center',
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
        padding:5,
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
    list: {
        flex: 1,
        marginRight:5,
    },
    payslip: {
        backgroundColor: colors.light,
        padding: 20,
        marginBottom: 20,
        elevation: 5,
        borderLeftWidth:5,
        borderColor:colors.primary,
        borderRadius:15,
    },
    month: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    detailsContainer: {
        marginLeft: 10,
    },
    detail: {
        fontSize: 16,
        color: colors.secondary,
        marginBottom: 5,
    },
});
