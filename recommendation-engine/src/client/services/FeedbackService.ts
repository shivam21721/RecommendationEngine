import { Socket } from "socket.io";
import { Response } from "../../interfaces/Interface";

export class FeedbackService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async addFeedback(feedback: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addFeedback', feedback);
            this.socket.on('addFeedbackResponse', (response: Response<any>) => {
                if(response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }
}
