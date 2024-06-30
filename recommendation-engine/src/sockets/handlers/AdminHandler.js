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
    socket.emit('adminMenu', [
        '1. ADD ITEM MENU',
        '2. DELETE ITEM MENU',
        '3. UPDATE ITEM MENU',
        'Enter the number to select an action:'
    ]);
    socket.on('adminAction', (action) => __awaiter(this, void 0, void 0, function* () {
        switch (action) {
            case 1:
                socket.emit('prompt', 'Enter item name, category, availability (true/false), and price :');
                socket.once('addItem', (data) => __awaiter(this, void 0, void 0, function* () {
                    const [name, categoryId, availability, price] = data.split(',');
                    try {
                        const newItem = yield menuItemController.addMenuItem(name.trim(), parseInt(categoryId), availability.trim() === 'true', parseFloat(price.trim()));
                        socket.emit('actionResult', `Menu item added: ${newItem.name} (ID: ${newItem.id})`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            socket.emit('actionResult', `Failed to add menu item: ${error.message}`);
                        }
                    }
                }));
                break;
            case 2:
                socket.emit('prompt', 'Enter item ID to delete:');
                socket.once('deleteItem', (id) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield menuItemController.deleteMenuItem(parseInt(id));
                        socket.emit('actionResult', `Menu item with ID ${id} deleted.`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            socket.emit('actionResult', `Failed to delete menu item: ${error.message}`);
                        }
                    }
                }));
                break;
            case 3:
                socket.emit('prompt', 'Enter item ID, new name, new price, and new availability (true/false):');
                socket.once('updateItem', (data) => __awaiter(this, void 0, void 0, function* () {
                    const [id, name, categoryId, availability, price] = data.split(',');
                    try {
                        yield menuItemController.updateMenuItem(parseInt(id.trim()), name.trim(), parseInt(categoryId), availability.trim() === 'true', parseFloat(price.trim()));
                        socket.emit('actionResult', `Menu item with ID ${id} updated.`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            socket.emit('actionResult', `Failed to update menu item: ${error.message}`);
                        }
                    }
                }));
                break;
            default:
                socket.emit('error', 'Invalid action.');
        }
    }));
}
exports.handleAdmin = handleAdmin;
