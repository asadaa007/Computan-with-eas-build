import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { colors } from '../utils/colors';

const EmployeeList = ({ employeeData, onPress, headTitle }) => {

    const renderEmployeeItem = ({ item }) => (
        <View style={styles.employeeItem}>
            <Image source={{ uri: item.profilePhoto }} style={styles.employeeImage} />
            <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.employeeId}>Employee ID: {item.id}</Text>
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
       <View>
        <View>
        <View style={styles.flatListHeader}>
          <Text style={styles.flatListHeaderText}>{headTitle}</Text>
          <Pressable onPress={onPress}>
            <Text>View All</Text>
          </Pressable>
        </View>
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
    );
};

const styles = StyleSheet.create({
    flatListContent: {
        flexGrow: 1,
    },
    employeeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: colors.light,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 15,
        width: 280,
        maxHeight: 180,
        borderLeftWidth: 5,
        borderColor: colors.primary,
        elevation: 5,
        marginBottom:15,
    },
    employeeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
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
    employeeId: {
        fontSize: 14,
        marginBottom: 5,
    },
    checkInOutTime: {
        fontSize: 12,
        color: colors.dark,
    },
    flatListHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      flatListHeaderText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark,
      },
});

export default EmployeeList;
