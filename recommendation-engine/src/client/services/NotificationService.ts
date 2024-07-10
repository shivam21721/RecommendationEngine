import { response } from "express";
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
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error("Failed to fetch the notifications"));
                }
            });
        });
    }
}