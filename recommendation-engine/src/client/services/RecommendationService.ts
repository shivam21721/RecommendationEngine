import { response } from "express";
import { Socket } from "socket.io";
import { Payload } from "../../interfaces/Interface";

export class RecommendationService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getNextDayMenuRecommendation() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getNextDayMenuRecommendation');
            this.socket.once('getNextDayMenuRecommendationResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    };

    async getFinalMenuRecommendation() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getFinalMenuRecommendation');
            this.socket.once('getFinalMenuRecommendationResponse', (response) => {
                console.log(response);
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async validateSelectedItems(selectedItems: any, menuItems: any) {

    }

    async rollOutItems(items: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('rolloutItemsChoiceForNextDay', items);
            this.socket.on('rolloutItemsChoiceForNextDayResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async rolloutFinalizedItems(items: Payload<{}>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('rolloutFinalizedItems', items);
            this.socket.on('rolloutFinalizedItemsResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

}
    
