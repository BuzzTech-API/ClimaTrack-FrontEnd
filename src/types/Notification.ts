// types/Notification.ts
export type Notification = {
    id: string; // ID único para a notificação, você pode adicionar isso ao retornar do backend
    timestamp: string; // Data e hora no formato string (ex: ISO)
    message: string;
    type: string;
    id_local: string;
    is_active: boolean;
};
