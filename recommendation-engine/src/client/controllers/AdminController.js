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
exports.showAdminOptions = void 0;
const AuthService_1 = require("../services/AuthService");
const readline_1 = require("../readline");
const MenuItemService_1 = require("../services/MenuItemService");
const adminOptions = [
    '1. ADD MENU ITEM',
    '2. DELETE MENU ITEM',
    '3. UPDATE MENU ITEM',
    '4. VIEW MENU ITEM'
];
4;
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
function showAdminOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        adminOptions.forEach((option) => {
            console.log(option);
        });
        readline_1.rl.question('Enter Your Choice: ', (choice) => {
            handleAdminChoice(choice);
        });
    });
}
exports.showAdminOptions = showAdminOptions;
function handleAdminChoice(choice) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (choice) {
            case '1':
                try {
                    readline_1.rl.question('Enter item name, category, availability (true/false), and price: ', (itemData) => __awaiter(this, void 0, void 0, function* () {
                        const [name, categoryId, availability, price] = itemData.split(',');
                        const response = yield menuItemService.addMenuItem({ name, categoryId, availability, price: parseFloat(price) });
                        console.log('Item Successfully added, item ID: ' + response);
                        showAdminOptions();
                    }));
                    break;
                }
                catch (error) {
                    console.log('Error: ', error);
                }
            case '2':
                try {
                    readline_1.rl.question('Enter item ID to delete: ', (itemId) => __awaiter(this, void 0, void 0, function* () {
                        const response = yield menuItemService.deleteMenuItem(parseInt(itemId));
                        console.log('Item Successfully delete, item ID: ' + response);
                        showAdminOptions();
                    }));
                }
                catch (error) {
                    console.log('Error: ', error);
                }
                break;
            case '3':
                try {
                    readline_1.rl.question('Enter item ID, new name, new category, new price, and new availability (true/false):', (itemData) => __awaiter(this, void 0, void 0, function* () {
                        const [id, name, categoryId, availability, price] = itemData.split(',');
                        const response = yield menuItemService.updateMenuItem({ id, name, categoryId, availability, price: parseFloat(price) });
                        console.log('Item Successfully Updated' + response);
                        showAdminOptions();
                    }));
                }
                catch (error) {
                    console.log('Error: ', error);
                }
                break;
            case '4':
                try {
                    const response = yield menuItemService.getMenuItems();
                    console.log(response);
                    showAdminOptions();
                }
                catch (error) {
                    console.log('Error: ', error);
                }
                break;
        }
    });
}
;
