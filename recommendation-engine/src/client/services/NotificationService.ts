import { Socket } from "socket.io";

export class NotificationService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async fetchUserNotifications(userId: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('fetchUserNotifications', userId);
            this.socket.on('fetchUserNotificationsResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }
}