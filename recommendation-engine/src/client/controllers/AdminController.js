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
const MenuItemService_1 = require("../services/MenuItemService");
const readline_1 = require("../readline");
const AuthService_2 = require("../services/AuthService");
const adminOptions = [
    '1. ADD MENU ITEM',
    '2. DELETE MENU ITEM',
    '3. UPDATE MENU ITEM',
    '4. VIEW MENU ITEM',
    'X. LOGOUT'
];
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
const authService = new AuthService_2.AuthService();
function showAdminOptions(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        adminOptions.forEach((option) => {
            console.log(option);
        });
        const choice = yield (0, readline_1.asyncUserInput)('Enter Your Choice: ');
        handleAdminChoice(choice, userId);
    });
}
exports.showAdminOptions = showAdminOptions;
function handleAdminChoice(choice, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (choice) {
            case '1':
                handleAddMenuItem(userId);
                break;
            case '2':
                handleDeleteMenuItem(userId);
                break;
            case '3':
                handleUpdateMenuItem(userId);
                break;
            case '4':
                handleViewMenuItems(userId);
                break;
            case 'X':
                handleLogout();
                break;
            default:
                console.log('Invalid Choice');
                showAdminOptions(userId);
        }
    });
}
;
function handleAddMenuItem(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemData = yield (0, readline_1.asyncUserInput)('Enter item name, category, availability (true/false), and price: ');
            const { name, categoryId, availability, price } = processMenuItemInput(itemData, false);
            const payload = {
                userId: userId,
                data: { name, categoryId, availability, price }
            };
            const response = yield menuItemService.addMenuItem(payload);
            console.log(response);
            showAdminOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error.message);
            showAdminOptions(userId);
        }
    });
}
function handleDeleteMenuItem(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield menuItemService.getMenuItems();
            console.table(menuItems);
            const itemId = yield (0, readline_1.asyncUserInput)('Enter item ID to delete: ');
            if (!isValidMenuItemId(itemId, menuItems)) {
                throw new Error("Invalid Menu Item Id");
            }
            const response = yield menuItemService.deleteMenuItem(parseInt(itemId));
            console.log(response);
            showAdminOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error.message);
            showAdminOptions(userId);
        }
    });
}
function handleUpdateMenuItem(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemData = yield (0, readline_1.asyncUserInput)('Enter item ID, new name, new category, new availability (true/false), and price: ');
            const { id, name, categoryId, availability, price } = processMenuItemInput(itemData, true);
            const response = yield menuItemService.updateMenuItem({ id, name, categoryId, availability, price });
            console.log(response);
            showAdminOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error.message);
            showAdminOptions(userId);
        }
    });
}
function handleViewMenuItems(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield menuItemService.getMenuItems();
            console.table(response);
            showAdminOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error.message);
            showAdminOptions(userId);
        }
    });
}
function handleLogout() {
    authService.logout();
}
function isValidMenuItemId(id, menuItems) {
    return menuItems.some((menuItem) => menuItem.id === Number(id));
}
function parseMenuItemInput(input, hasMenuId) {
    const values = input.split(',').map(item => item.trim());
    const expectedLength = hasMenuId ? 5 : 4;
    if (values.length !== expectedLength) {
        throw new Error(`Input must contain exactly ${expectedLength} comma-separated values`);
    }
    return values;
}
function validateName(name) {
    if (!name) {
        throw new Error("Invalid name");
    }
    return name;
}
function convertMenuId(menuIdStr) {
    const menuId = Number(menuIdStr);
    if (isNaN(menuId)) {
        throw new Error("Invalid menuId, must be a number");
    }
    return menuId;
}
function convertCategoryId(categoryIdStr) {
    const categoryId = Number(categoryIdStr);
    if (isNaN(categoryId)) {
        throw new Error("Invalid categoryId, must be a number");
    }
    return categoryId;
}
function convertAvailability(availabilityStr) {
    if (availabilityStr.toLowerCase() === 'true') {
        return true;
    }
    else if (availabilityStr.toLowerCase() === 'false') {
        return false;
    }
    else {
        throw new Error("Invalid availability, must be 'true' or 'false'");
    }
}
function convertPrice(priceStr) {
    const price = Number(priceStr);
    if (isNaN(price)) {
        throw new Error("Invalid price, must be a number");
    }
    return price;
}
function processMenuItemInput(input, hasMenuId) {
    const values = parseMenuItemInput(input, hasMenuId);
    let index = 0;
    const menuItem = {
        name: "",
        categoryId: 0,
        price: 0,
        availability: false
    };
    if (hasMenuId) {
        menuItem.id = convertMenuId(values[index++]);
    }
    menuItem.name = validateName(values[index++]);
    menuItem.categoryId = convertCategoryId(values[index++]);
    menuItem.availability = convertAvailability(values[index++]);
    menuItem.price = convertPrice(values[index++]);
    return menuItem;
}
