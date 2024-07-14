import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnnouncementsList from '../../components/AnnouncementItem';
import { colors } from '../../utils/colors';

const announcementsData = [
    {
        id: '1',
        title: 'Rocket Chat Maintenance',
        by: 'Sajeel Qureshi',
        date: '2024-05-01',
        details: 'The system will be down for maintenance on May 1st from 12:00 AM to 4:00 AM.'
    },
    {
        id: '2',
        title: 'New Feature Release',
        by: 'Muhammad Kassem',
        date: '2024-05-10',
        details: 'We are excited to announce the release of our new feature on May 10th.'
    },
    {
        id: '3',
        title: 'Holiday Notice',
        by: 'Nadia Saleem',
        date: '2024-05-20',
        details: 'The office will be closed on May 20th for the national holiday.'
    },
    {
        id: '4',
        title: 'Rocket Chat Maintenance',
        by: 'Muhammad Kassem',
        date: '2024-05-01',
        details: 'The system will be down for maintenance on May 1st from 12:00 AM to 4:00 AM.'
    },
    {
        id: '5',
        title: 'New Feature Release',
        by: 'Muhammad Nasir',
        date: '2024-05-10',
        details: 'We are excited to announce the release of our new feature on May 10th.'
    },
    {
        id: '6',
        title: 'Holiday Notice',
        by: 'Nadia Saleem',
        date: '2024-05-20',
        details: 'The office will be closed on May 20th for the national holiday.'
    },
];

const Announcements = () => {
    return (
        <View style={styles.container}>
            <AnnouncementsList data={announcementsData} />
        </View>
    );
};

export default Announcements;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.light,
    },
});
