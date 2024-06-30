import { Socket } from 'socket.io';
import { MenuItemController } from '../../controllers/MenuItemController';

const menuItemController = new MenuItemController();

export function handleAdmin(socket: Socket, user: any) {
    socket.emit('adminMenu', [
        '1. ADD ITEM MENU',
        '2. DELETE ITEM MENU',
        '3. UPDATE ITEM MENU',
        'Enter the number to select an action:'
    ]);

    socket.on('adminAction', async (action: number) => {
        switch (action) {
            case 1:
                socket.emit('prompt', 'Enter item name, category, availability (true/false), and price :');
                socket.once('addItem', async (data: string) => {
                    const [name, categoryId, availability, price] = data.split(',');
                    try {
                        const newItem = await menuItemController.addMenuItem(name.trim(), parseInt(categoryId), availability.trim() === 'true', parseFloat(price.trim()) );
                        socket.emit('actionResult', `Menu item added: ${newItem.name} (ID: ${newItem.id})`);
                    } catch (error) {
                        if (error instanceof Error) {
                            socket.emit('actionResult', `Failed to add menu item: ${error.message}`);
                        }
                        
                    }
                });
                break;
            case 2:
                socket.emit('prompt', 'Enter item ID to delete:');
                socket.once('deleteItem', async (id: string) => {
                    try {
                        await menuItemController.deleteMenuItem(parseInt(id));
                        socket.emit('actionResult', `Menu item with ID ${id} deleted.`);
                    } catch (error) {
                        if (error instanceof Error) {
                            socket.emit('actionResult', `Failed to delete menu item: ${error.message}`);
                        }
                    }
                });
                break;
            case 3:
                socket.emit('prompt', 'Enter item ID, new name, new price, and new availability (true/false):');
                socket.once('updateItem', async (data: string) => {
                    const [id, name, categoryId, availability, price] = data.split(',');
                    try {
                        await menuItemController.updateMenuItem(parseInt(id.trim()), name.trim(), parseInt(categoryId), availability.trim() === 'true', parseFloat(price.trim()));
                        socket.emit('actionResult', `Menu item with ID ${id} updated.`);
                    } catch (error) {
                        if (error instanceof Error) {
                            socket.emit('actionResult', `Failed to update menu item: ${error.message}`);
                        }
                    }
                });
                break;
            default:
                socket.emit('error', 'Invalid action.');
        }
    });
}