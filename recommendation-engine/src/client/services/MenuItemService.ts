import { Socket } from "socket.io";
import { MenuItem, Payload, Response } from "../../interfaces/Interface";

export class MenuItemService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getMenuItems() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getMenuItems');
            this.socket.once('getMenuItemsResponse', (response: Response<any>) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async addMenuItem(payload: Payload<MenuItem>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addMenuItem', payload);
            this.socket.once('addMenuItemResponse', (response) => {
                if (response.status === 'success') {
                    resolve(response.message);
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
                    resolve(response.message);
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
                    resolve(response.message);
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

    async voteForMenuItem(items: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('voteMenuItems', items);
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
    
