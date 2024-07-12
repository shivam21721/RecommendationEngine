import { Socket } from "socket.io";

export class MenuItemService {
    private socket: Socket;

    constructor(socket: any) {
        this.socket = socket;
    }

    async getMenuItems() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getMenuItems');
            this.socket.once('getMenuItemsResponse', (menuItems) => {
                if (menuItems) {
                    resolve(menuItems);
                } else {
                    reject(new Error('Failed to get menu items.'));
                }
            });
        });
    }

    async addMenuItem(itemData: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addMenuItem', itemData);
            this.socket.once('addMenuItemResponse', (response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to add menu item.'));
                }
            });
        });
    }

    async deleteMenuItem(itemId: number) {
        return new Promise((resolve, reject) => {
            this.socket.emit('deleteMenuItem', itemId);
            this.socket.once('deleteMenuItemResponse', (response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to delete menu item.'));
                }
            });
        });
    }

    async updateMenuItem(itemData: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('updateMenuItem', itemData);
            this.socket.once('updateMenuItemResponse', (response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to update menu item.'));
                }
            });
        });
    }

    async getTodayMenu() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getTodayMenu');
            this.socket.on('getTodayMenuResponse', (response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to fetch today menu item.'));
                }
            });
        });
    }

    async getRolledOutMenu() {
        return new Promise((resolve, reject) => {
            this.socket.emit('getRolledOutMenu');
            this.socket.on('getRolledOutMenuResponse', (response) => {
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error('Failed to Rolled out menu item'));
                }
            });
        });
    }

    async voteForMenuItem(itemIds: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('voteMenuItems', itemIds);
            this.socket.on('voteMenuItemsResponse', (response) => {
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error("Failed to vote the items"));
                }

            })
        })
    }

    async fetchNextDayFinalizedMenu() {
        return new Promise((resolve, reject) => {
            this.socket.emit('fetchNextDayFinalizedMenu');
            this.socket.on('fetchNextDayFinalizedMenuResponse', (response) => {
                if(response) {
                    resolve(response);
                } else {
                    reject(new Error("Failed to fetch the next day finalized menu"));
                }
            })
        })
    }
}
    
