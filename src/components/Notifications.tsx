import React, { useEffect, useState } from "react"
import { db, collection, query, orderBy, onSnapshot  } from "../config/firebase"
import { View, Text, FlatList } from 'react-native'

interface Notification {
    id: string
    timestamp: Date
    message: string
    type: string
    is_active: boolean
  }


const NotificationList = () => {

    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
        // Define a referência para a coleção "notifications" no Firestore
        const firebaseCollection = collection(db, "notifications")

        // Cria uma consulta (query) para ordenar os documentos por "timestamp" em ordem decrescente
        const q = query(firebaseCollection, orderBy("timestamp", "desc"))

        // Listener em tempo real
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // Mapeia os documentos obtidos no snapshot para um array de objetos de notificação
            const newNotifications: Notification[] = snapshot.docs.map(doc => {
            const data = doc.data()
            const timestamp = data.timestamp?.toDate()
            const message = data.message
            const type = data.type
            const is_active = data.is_active

            // Para cada documento retorna um objeto com id, timestamp e message
            return {
                id: doc.id,
                timestamp: timestamp,
                message: message,
                type: type,
                is_active: is_active
            }
            })
            setNotifications(newNotifications)
        })

        return () => unsubscribe()
    }, [])

    return (
        <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Notificações</Text>
        <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={{ padding: 8, borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {new Date(item.timestamp).toLocaleString()}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.type}</Text>
                <Text>{item.message}</Text>
            </View>
            )}
        />
        </View>
    )
}

export default NotificationList