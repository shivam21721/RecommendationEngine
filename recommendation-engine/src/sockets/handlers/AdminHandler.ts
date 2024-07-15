import { Socket } from 'socket.io';
import { MenuItemController } from '../../controllers/MenuItemController';

const menuItemController = new MenuItemController();

export function handleAdmin(socket: Socket, user: any) {
    socket.on('getMenuItems', async (payload) => {
        const response = await menuItemController.getMenuItems(payload);
        socket.emit('getMenuItemsResponse', response);
    });

    socket.on('addMenuItem', async (payload) => {
        const response = await menuItemController.addMenuItem(payload);
        socket.emit('addMenuItemResponse', response);
    });

    socket.on('deleteMenuItem', async (payload) => {
        const response = await menuItemController.deleteMenuItem(payload);
        socket.emit('deleteMenuItemResponse', response);
    });

    socket.on('updateMenuItem', async (payload) => {
        const response = await menuItemController.updateMenuItem(payload);
        socket.emit('updateMenuItemResponse', response);
    });
}