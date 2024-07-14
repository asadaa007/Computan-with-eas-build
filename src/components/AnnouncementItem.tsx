// components/AnnouncementsList.js
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const AnnouncementItem = ({ announcement }) => (
    <View style={styles.announcementItem}>
        <View style={styles.header}>
            <Ionicons name="megaphone" size={24} color={colors.primary} />
            <View style={styles.headerTextContainer}>
                <Text style={styles.title}>{announcement.title}</Text>
                <Text style={styles.by}>Announced by: {announcement.by}</Text>
                <Text style={styles.date}>{announcement.date}</Text>
            </View>
        </View>
        <Text style={styles.details}>{announcement.details}</Text>
    </View>
);

const AnnouncementsList = ({ data }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <AnnouncementItem announcement={item} />}
            keyExtractor={item => item.id}
        />
    );
};

export default AnnouncementsList;

const styles = StyleSheet.create({
    announcementItem: {
        backgroundColor: colors.gray3,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderColor: colors.primary,
        elevation:5,
        marginRight:5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTextContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary,
    },
    date: {
        fontSize: 14,
        color: colors.secondary,
    },
    by: {
        fontSize: 14,
        color: colors.lightGray,
    },
    details: {
        fontSize: 16,
        color: colors.dark,
    },
});
