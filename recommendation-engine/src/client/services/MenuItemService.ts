import { Socket } from "socket.io";
import { Response } from "../../interfaces/Interface";

export class MenuItemService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getMenuItems() {
        return new Promise((resolve, reject) => {
            console.log('inside service');
            this.socket.emit('getMenuItems');
            this.socket.once('getMenuItemsResponse', (response: Response<any>) => {
                console.log('response', response);
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async addMenuItem(itemData: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addMenuItem', itemData);
            this.socket.once('addMenuItemResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async deleteMenuItem(itemId: number) {
        return new Promise((resolve, reject) => {
            this.socket.emit('deleteMenuItem', itemId);
            this.socket.once('deleteMenuItemResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async updateMenuItem(itemData: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('updateMenuItem', itemData);
            this.socket.once('updateMenuItemResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async getTodayMenu() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getTodayMenu');
            this.socket.on('getTodayMenuResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async getRolledOutMenu() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getRolledOutMenu');
            this.socket.on('getRolledOutMenuResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async voteForMenuItem(itemIds: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('voteMenuItems', itemIds);
            this.socket.on('voteMenuItemsResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }

            })
        })
    }

    async fetchNextDayFinalizedMenu() {
        return new Promise((resolve, reject) => {
            this.socket.emit('fetchNextDayFinalizedMenu');
            this.socket.on('fetchNextDayFinalizedMenuResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            })
        })
    }
}
    
