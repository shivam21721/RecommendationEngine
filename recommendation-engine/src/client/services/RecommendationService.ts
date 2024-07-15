import { response } from "express";
import { Socket } from "socket.io";
import { Payload, SelectedMenuItems } from "../../interfaces/Interface";

export class RecommendationService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getNextDayMenuRecommendation() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getNextDayMenuRecommendation');
            this.socket.once('getNextDayMenuRecommendationResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    };

    async getFinalMenuRecommendation(payload: Payload<null>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('getFinalMenuRecommendation', payload);
            this.socket.once('getFinalMenuRecommendationResponse', (response) => {
                console.log(response);
                if ('success' === response.status) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async validateSelectedItems(selectedItems: any, menuItems: any) {

    }

    async rollOutItems(payload: Payload<SelectedMenuItems>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('rolloutItemsChoiceForNextDay', payload);
            this.socket.on('rolloutItemsChoiceForNextDayResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async rolloutFinalizedItems(payload: Payload<SelectedMenuItems>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('rolloutFinalizedItems', payload);
            this.socket.on('rolloutFinalizedItemsResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

}
    
