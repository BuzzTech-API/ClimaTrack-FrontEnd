// components/NotificationList.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { Notification } from '../types/Notification';

type NotificationListProps = {
    notifications: Notification[];
    onSelectNotification: (notification: Notification) => void;
};

const NotificationList: React.FC<NotificationListProps> = ({
    notifications,
    onSelectNotification,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alertas</Text>
            {notifications.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.notificationItem}
                    onPress={() => onSelectNotification(item)}>
                    <MaterialIcons
                        name="notifications"
                        size={24}
                        color="#000"
                        style={styles.icon}
                    />
                    <Text style={styles.message}>{item.message}</Text>
                    <AntDesign name="arrowright" size={24} color="#000" style={styles.arrow} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        marginRight: 8,
    },
    message: {
        flex: 1,
        fontSize: 16,
    },
    arrow: {
        marginLeft: 8,
    },
});

export default NotificationList;
