// components/NotificationModal.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Notification } from '../types/Notification';

type NotificationModalProps = {
    notification: Notification | null;
    visible: boolean;
    onClose: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({
    notification,
    visible,
    onClose,
}) => {
    if (!notification) return null;

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <MaterialIcons
                        name="notifications"
                        size={48}
                        color="#000"
                        style={styles.modalIcon}
                    />
                    <Text style={styles.modalTitle}>{notification.message}</Text>
                    <Text style={styles.modalText}>
                        No dia {notification.timestamp} a temperatura excedeu o limite definido
                    </Text>
                    <TouchableOpacity style={styles.dismissButton} onPress={onClose}>
                        <Text style={styles.dismissButtonText}>Dispensar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalIcon: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
    },
    dismissButton: {
        marginTop: 16,
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    dismissButtonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default NotificationModal;
