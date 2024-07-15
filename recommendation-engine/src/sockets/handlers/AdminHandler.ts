import { Socket } from 'socket.io';
import { MenuItemController } from '../../controllers/MenuItemController';

const menuItemController = new MenuItemController();

export function handleAdmin(socket: Socket, user: any) {
    socket.on('getMenuItems', async () => {
        const response = await menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', response);
    });

    socket.on('addMenuItem', async (payload) => {
        const response = await menuItemController.addMenuItem(payload);
        socket.emit('addMenuItemResponse', response);
    });

    socket.on('deleteMenuItem', async (id) => {
        const response = await menuItemController.deleteMenuItem(id);
        socket.emit('deleteMenuItemResponse', response);
    });

    socket.on('updateMenuItem', async (itemData) => {
        const response = await menuItemController.updateMenuItem(itemData);
        socket.emit('updateMenuItemResponse', response);
    });
}