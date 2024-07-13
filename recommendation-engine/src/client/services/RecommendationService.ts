import { response } from "express";
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

    async getFinalMenuRecommendation() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getFinalMenuRecommendation');
            this.socket.once('getFinalMenuRecommendationResponse', (menuItems) => {
                if (menuItems) {
                    resolve(menuItems);
                } else {
                    reject(new Error('Failed to get menu items.'));
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
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to rollOutItms'));
                }
            });
        });
    }

    async rolloutFinalizedItems(itemIds: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('rolloutFinalizedItems', itemIds);
            this.socket.on('rolloutFinalizedItemsResponse', (response) => {
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to rollOutItems'));
                }
            });
        });
    }

}
    
