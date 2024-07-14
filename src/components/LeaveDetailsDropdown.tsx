import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const LeaveDetailsDropdown = ({ leave }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return colors.info;
            case 'Approved':
                return colors.success;
            case 'Cancelled':
                return colors.eid;
            default:
                return colors.light;
        }
    };

    const statusColor = getStatusColor(leave.status);
    const isCancelled = leave.status === 'Cancelled';

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.dropdownHeader}>
                <Ionicons name="checkmark-circle" size={24} color={statusColor} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Leave: {leave.date} to {leave.endDate}</Text>
                    <Text style={[styles.statusText, { color: statusColor }]}>{leave.status}</Text>
                </View>
                <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} color={colors.light} style={styles.dropdownIcon} />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.dropdownContent}>
                    <Text style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Start Date: </Text>
                        {leave.startDate}
                    </Text>
                    <Text style={styles.detailItem}>
                        <Text style={styles.detailTitle}>End Date: </Text>
                        {leave.endDate}
                    </Text>
                    <Text style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Leave Type: </Text>
                        {leave.type}
                    </Text>
                    <Text style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Reason: </Text>
                        {leave.reason}
                    </Text>
                    <Text style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Document: </Text>
                        {leave.document}
                    </Text>
                    <TouchableOpacity
                        style={[styles.revokeButton, isCancelled && styles.revokeButtonDisabled]}
                        disabled={isCancelled}
                    >
                        <Text style={[styles.revokeButtonText, isCancelled && styles.revokeButtonTextDisabled]}>Revoke</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: colors.light,
    },
    dropdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingVertical:20,
        backgroundColor: colors.light,
        justifyContent: 'space-between',
        borderRadius: 5,
        elevation:5,
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.secondary,
    },
    statusText: {
        fontSize: 14,
    },
    dropdownIcon: {
        marginLeft: 'auto',
        color: colors.dark,
    },
    dropdownContent: {
        padding: 10,
        backgroundColor: colors.background,
    },
    detailItem: {
        marginBottom: 5,
    },
    detailTitle: {
        fontWeight: '700',
    },
    revokeButton: {
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        alignItems: 'center',
    },
    revokeButtonDisabled: {
        backgroundColor: colors.gray,
    },
    revokeButtonText: {
        color: colors.light,
        fontWeight: '700',
    },
    revokeButtonTextDisabled: {
        color: colors.light,
    },
});

export default LeaveDetailsDropdown;
