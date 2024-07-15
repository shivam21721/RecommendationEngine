import { Socket } from "socket.io";
import { Payload } from "../../interfaces/Interface";

export class NotificationService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async fetchUserNotifications(payload: Payload<null>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('fetchUserNotifications', payload);
            this.socket.on('fetchUserNotificationsResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }
}