import { Socket } from "socket.io";
import { MenuItem, Payload, Response, SelectedMenuItems } from "../../interfaces/Interface";

export class MenuItemService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getMenuItems(payload: Payload<null>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('getMenuItems', payload);
            this.socket.once('getMenuItemsResponse', (response: Response<any>) => {
                if ('success' === response.status) {
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
                if ('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async deleteMenuItem(payload: Payload<number>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('deleteMenuItem', payload);
            this.socket.once('deleteMenuItemResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async updateMenuItem(payload: Payload<MenuItem>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('updateMenuItem', payload);
            this.socket.once('updateMenuItemResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async getTodayMenu(payload: Payload<null>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('getTodayMenu', payload);
            this.socket.on('getTodayMenuResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async getRolledOutMenu(payload: Payload<null>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('getRolledOutMenu', payload);
            this.socket.on('getRolledOutMenuResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    async voteForMenuItem(payload: Payload<SelectedMenuItems>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('voteMenuItems', payload);
            this.socket.on('voteMenuItemsResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.message);
                } else {
                    reject(new Error(response.message));
                }

            })
        })
    }

    async fetchNextDayFinalizedMenu(payload: Payload<null>) {
        return new Promise((resolve, reject) => {
            this.socket.emit('fetchNextDayFinalizedMenu', payload);
            this.socket.on('fetchNextDayFinalizedMenuResponse', (response) => {
                if ('success' === response.status) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            })
        })
    }
}
    
