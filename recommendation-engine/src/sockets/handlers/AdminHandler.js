"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAdmin = void 0;
const MenuItemController_1 = require("../../controllers/MenuItemController");
const menuItemController = new MenuItemController_1.MenuItemController();
function handleAdmin(socket, user) {
    socket.on('getMenuItems', () => __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', menuItems);
    }));
    socket.on('addMenuItem', (itemData) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.addMenuItem(itemData);
        console.log('response: ', response);
        socket.emit('addMenuItemResponse', response);
    }));
    socket.on('deleteMenuItem', (id) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.deleteMenuItem(id);
        socket.emit('deleteMenuItemResponse', response);
    }));
    socket.on('updateMenuItem', (itemData) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.updateMenuItem(itemData);
        socket.emit('updateMenuItemResponse', response);
    }));
}
exports.handleAdmin = handleAdmin;
// export function handleAdmin(socket: Socket, user: any) {
//     socket.on('adminChoices', () => {
//         socket.emit('adminChoices', [
//             '1. ADD MENU ITEM',
//             '2. DELETE MENU ITEM',
//             '3. UPDATE MENU ITEM',
//             '4. VIEW MENU ITEM',
//             'X. LOGOUT' 
//         ])
//     } );
//     socket.on('adminAction', async (action: number) => {
//         switch (action) {
//             case 1:
//                 socket.emit('prompt', 'Enter item name, category, availability (true/false), and price :');
//                 socket.on('addItem', async (data: string) => {
//                     const [name, categoryId, availability, price] = data.split(',');
//                     try {
//                         const newItem = await menuItemController.addMenuItem(name.trim(), parseInt(categoryId), availability.trim() === 'true', parseFloat(price.trim()) );
//                         socket.emit('actionResult', `Menu item added: ${newItem.name} (ID: ${newItem.id})`);
//                     } catch (error) {
//                         if (error instanceof Error) {
//                             socket.emit('actionResult', `Failed to add menu item: ${error.message}`);
//                         }
//                     }
//                 });
//                 break;
//             case 2:
//                 socket.emit('prompt1', 'Enter item ID to delete:');
//                 socket.on('deleteItem', async (id: string) => {
//                     try {
//                         await menuItemController.deleteMenuItem(parseInt(id));
//                         socket.emit('actionResult', `Menu item with ID ${id} deleted.`);
//                     } catch (error) {
//                         if (error instanceof Error) {
//                             socket.emit('actionResult', `Failed to delete menu item: ${error.message}`);
//                         }
//                     }
//                 });
//                 break;
//             case 3:
//                 socket.emit('prompt3', 'Enter item ID, new name, new price, and new availability (true/false):');
//                 socket.on('updateItem', async (data: string) => {
//                     const [id, name, categoryId, availability, price] = data.split(',');
//                     try {
//                         await menuItemController.updateMenuItem(parseInt(id.trim()), name.trim(), parseInt(categoryId), availability.trim() === 'true', parseFloat(price.trim()));
//                         socket.emit('actionResult', `Menu item with ID ${id} updated.`);
//                     } catch (error) {
//                         if (error instanceof Error) {
//                             socket.emit('actionResult', `Failed to update menu item: ${error.message}`);
//                         }
//                     }
//                 });
//                 break;
//             case 4:
//                 const menuItems = await menuItemController.getMenuItems();
//                 socket.emit('actionResult', menuItems);
//                 break;
//             default:
//                 socket.emit('error', 'Invalid action.');
//         }
//     });
// }
