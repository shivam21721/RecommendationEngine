import { socket } from "../services/AuthService";
import { MenuItemService } from "../services/MenuItemService";
import { asyncUserInput } from "../readline";
import { MenuItem } from "../../interfaces/Interface";
import { AuthService } from "../services/AuthService";
import { isValidNumber } from "../../utils/Validation";

const adminOptions = [
    '1. ADD MENU ITEM',
    '2. DELETE MENU ITEM',
    '3. UPDATE MENU ITEM',
    '4. VIEW MENU ITEM',
    'X. LOGOUT'
];

const menuItemService = new MenuItemService(socket);
const authService = new AuthService();

export async function showAdminOptions(userId: number) {
    adminOptions.forEach((option) => {
        console.log(option);
    })
    const choice = await asyncUserInput('Enter Your Choice: ');
    handleAdminChoice(choice, userId);
}

async function handleAdminChoice(choice: string, userId: number) {
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
};

async function handleAddMenuItem(userId: number) {
    try {
        const itemData = await asyncUserInput('Enter item name, category, availability (true/false), and price: ');
        const {name, categoryId, availability, price} = processMenuItemInput(itemData, false);
        
        const payload = {
            userId: userId,
            data: {name, categoryId, availability, price }
        }
        const response = await menuItemService.addMenuItem(payload);
        console.log(response);
        showAdminOptions(userId);
    } catch(error) {
        console.log('Error: ', (error as Error).message);
        showAdminOptions(userId);
    }
}

async function handleDeleteMenuItem(userId: number) {
    try {
        const menuItems = await menuItemService.getMenuItems();
        console.table(menuItems);
        const itemId = await asyncUserInput('Enter item ID to delete: ');
        if(!isValidMenuItemId(itemId, menuItems as MenuItem[])) {
            throw new Error("Invalid Menu Item Id");
        }
        const response = await menuItemService.deleteMenuItem(parseInt(itemId));
        console.log(response);
        showAdminOptions(userId);
    } catch(error) {
        console.log('Error: ', (error as Error).message);
        showAdminOptions(userId);
    }
}

async function handleUpdateMenuItem(userId: number) {
    try {
        const itemData = await asyncUserInput('Enter item ID, new name, new category, new availability (true/false), and price: ');
        const {id, name, categoryId, availability, price} = processMenuItemInput(itemData, true);
        const response = await menuItemService.updateMenuItem({id, name, categoryId, availability, price});
        console.log(response);
        showAdminOptions(userId);
    } catch(error) {
        console.log('Error: ', (error as Error).message);
        showAdminOptions(userId);
    }
}

async function handleViewMenuItems(userId: number) {
    try {
        const response = await menuItemService.getMenuItems();
        console.table(response);
        showAdminOptions(userId);
    } catch(error) {
        console.log('Error: ', (error as Error).message);
        showAdminOptions(userId);
    }
}

function handleLogout() {
    authService.logout();
}

function isValidMenuItemId(id: string, menuItems: MenuItem[]): boolean {
    return menuItems.some((menuItem) => menuItem.id === Number(id));
}

function parseMenuItemInput(input: string, hasMenuId: boolean): string[] {
    const values = input.split(',').map(item => item.trim());
    const expectedLength = hasMenuId ? 5 : 4;
    if (values.length !== expectedLength) {
        throw new Error(`Input must contain exactly ${expectedLength} comma-separated values`);
    }
    return values;
}

function validateName(name: string): string {
    if (!name) {
        throw new Error("Invalid name");
    }
    return name;
}

function convertMenuId(menuIdStr: string): number {
    const menuId = Number(menuIdStr);
    if (isNaN(menuId)) {
        throw new Error("Invalid menuId, must be a number");
    }
    return menuId;
}

function convertCategoryId(categoryIdStr: string): number {
    const categoryId = Number(categoryIdStr);
    if (isNaN(categoryId)) {
        throw new Error("Invalid categoryId, must be a number");
    }
    return categoryId;
}

function convertAvailability(availabilityStr: string): boolean {
    if (availabilityStr.toLowerCase() === 'true') {
        return true;
    } else if (availabilityStr.toLowerCase() === 'false') {
        return false;
    } else {
        throw new Error("Invalid availability, must be 'true' or 'false'");
    }
}

function convertPrice(priceStr: string): number {
    const price = Number(priceStr);
    if (isNaN(price)) {
        throw new Error("Invalid price, must be a number");
    }
    return price;
}

function processMenuItemInput(input: string, hasMenuId: boolean): MenuItem {
    const values = parseMenuItemInput(input, hasMenuId);

    let index = 0;
    const menuItem: MenuItem = {
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



