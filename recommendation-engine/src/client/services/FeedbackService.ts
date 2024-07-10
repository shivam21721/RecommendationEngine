import { Socket } from "socket.io";

export class FeedbackService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async addFeedback(feedback: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addFeedback', feedback);
            this.socket.on('addFeedbackResponse', (response) => {
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to add feedback'));
                }
            });
        });
    }
}
