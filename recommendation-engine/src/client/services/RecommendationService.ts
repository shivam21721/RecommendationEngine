import { Socket } from "socket.io";

export class RecommendationService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getNextDayMenuRecommendation() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getNextDayMenuRecommendation');
            this.socket.once('getNextDayMenuRecommendationResponse', (menuItems) => {
                if (menuItems) {
                    resolve(menuItems);
                } else {
                    reject(new Error('Failed to get menu items.'));
                }
            });
        });
    };

    async validateSelectedItems(selectedItems: any, menuItems: any) {

    }

    async rollOutItems(items: any) {
        
    }

}
    
