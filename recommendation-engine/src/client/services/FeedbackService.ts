import { Socket } from "socket.io";
import { Feedback, Payload, Response } from "../../interfaces/Interface";

export class FeedbackService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async addFeedback(payload: Payload<Feedback>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addFeedback', payload);
            this.socket.on('addFeedbackResponse', (response: Response<any>) => {
                if('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }
}
