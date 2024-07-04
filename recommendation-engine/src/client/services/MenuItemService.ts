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

}
    
