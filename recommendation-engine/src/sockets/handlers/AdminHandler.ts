import { Socket } from 'socket.io';
import { MenuItemController } from '../../controllers/MenuItemController';

const menuItemController = new MenuItemController();

export function handleAdmin(socket: Socket, user: any) {
    socket.on('getMenuItems', async () => {
        const menuItems = await menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', menuItems);
    });

    socket.on('addMenuItem', async (itemData) => {
        const response = await menuItemController.addMenuItem(itemData);
        console.log('response: ', response);
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