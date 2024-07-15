import { socket } from "../services/AuthService";
import { asyncUserInput } from "../readline";
import { MenuItemService } from "../services/MenuItemService";
import { NotificationService } from "../services/NotificationService";
import { RecommendationService } from "../services/RecommendationService";
import { showCategoryBasedMenuItems, showMenu } from "../../utils/Menu";
import { FinalizedMenuItem, RecommendedMenu } from "../../interfaces/Interface";
import { areAllItemsUnique } from "../../utils/Validation";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();
const menuItemService = new MenuItemService(socket);
const notificationService = new NotificationService(socket);
const recommendationService = new RecommendationService(socket);

var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. VIEW NOTIFICATIONS',
    'X. LOGOUT'
]

export async function showChefOptions(userId: any) {
    chefOptions.forEach((option) => {
        console.log(option);
    });

    const choice = await asyncUserInput('Enter your choice: ');
    handleChefChoice(choice, userId);
}

async function handleChefChoice(choice: string, userId: any) {
    switch(choice) {
        case '1':
            handleViewMenuItem(userId);
            break;
        case '2':
            handleRollOutItemsForNextDay(userId);
            break;
        case '3':
            handleRolloutFinalizedItems(userId);
            break;
        case '4':
            handleNotification(userId);
            break;
        case 'X':
            handleLogout();
            break;
        default:
            console.log('Invalid Choice');
            showChefOptions(userId);
    }
}

async function handleViewMenuItem(userId: any) {
    try {
        const payload = {
            userId: userId,
            data: null
        }
        const menuItems = await menuItemService.getMenuItems(payload);
        console.table(menuItems);
        showChefOptions(userId);
    } catch(error) {
        console.log('Error: ', error);
    }
}

async function handleRollOutItemsForNextDay(userId: any) {
    try {
        const menuItems:any = await recommendationService.getNextDayMenuRecommendation();
        showCategoryBasedMenuItems(menuItems);

        const selectedBreakfastItems = await asyncUserInput('Enter comma separated breakfast items to roll out: ');
        const selectedBreakfastItemsList = selectedBreakfastItems.split(',').map(id => Number(id));
        if(!isValidItemsSelected(selectedBreakfastItemsList, menuItems, 'breakfast')) {
            throw new Error('Invalid Items selected for breakfast, Please verify the menu items ids');
        }

        const selectedLunchItems = await asyncUserInput('Enter comma separated Lunch items to roll out: ');
        const selectedLunchItemsList = selectedLunchItems.split(',').map(id => Number(id));
        if(!isValidItemsSelected(selectedLunchItemsList, menuItems, 'lunch')) {
            throw new Error('Invalid Items selected for Lunch, Please verify the menu items ids');
        }

        const selectedDinnerItems = await asyncUserInput('Enter comma separated Dinner items to roll out: ');
        const selectedDinnerItemsList = selectedDinnerItems.split(',').map(item => Number(item));
        if(!isValidItemsSelected(selectedDinnerItemsList, menuItems, 'dinner')) {
            throw new Error('Invalid Items selected for Dinner, Please verify the menu items ids');
        }

        var selectedItems = {
            breakfast: selectedBreakfastItemsList,
            lunch: selectedLunchItemsList,
            dinner: selectedDinnerItemsList
        }

        const payload = {
            userId: userId,
            data: selectedItems
        }
        const response = await recommendationService.rollOutItems(payload);
        console.log(response);
        showChefOptions(userId);
    } catch(error) {
        console.log('Error: ',(error as Error).message);
        showChefOptions(userId)
    }
}

async function handleRolloutFinalizedItems(userId: any) {
    try {
        const getFinalMenuRecommendationPayload = {
            userId: userId,
            data: null
        }
        const menuItems: any = await recommendationService.getFinalMenuRecommendation(getFinalMenuRecommendationPayload);
        showMenu(menuItems);

        const selectedBreakfastItems = await asyncUserInput('Enter comma separated breakfast items to roll out: ');
        const selectedBreakfastItemsList = selectedBreakfastItems.split(',').map(id => Number(id));
        if(!isValidFinalItemsSelected(selectedBreakfastItemsList, menuItems.breakfast)) {
            throw new Error('Invalid Items selected for breakfast, Please verify the menu items ids');
        }

        const selectedLunchItems = await asyncUserInput('Enter comma separated Lunch items to roll out: ');
        const selectedLunchItemsList = selectedLunchItems.split(',').map(id => Number(id));
        if(!isValidFinalItemsSelected(selectedLunchItemsList, menuItems.lunch)) {
            throw new Error('Invalid Items selected for Lunch, Please verify the menu items ids');
        }

        const selectedDinnerItems = await asyncUserInput('Enter comma separated Dinner items to roll out: ');
        const selectedDinnerItemsList = selectedDinnerItems.split(',').map(item => Number(item));
        if(!isValidFinalItemsSelected(selectedDinnerItemsList, menuItems.dinner)) {
            throw new Error('Invalid Items selected for Dinner, Please verify the menu items ids');
        }

        const selectedItems = {
            breakfast: selectedBreakfastItemsList,
            lunch: selectedLunchItemsList,
            dinner: selectedDinnerItemsList
        }

        const payload = {
            userId: userId,
            data: selectedItems
        }

        const response = await recommendationService.rolloutFinalizedItems(payload);
        console.log(response);
        showChefOptions(userId);
    } catch(error) {
        console.log('Error: ',(error as Error).message);
        showChefOptions(userId);
    }
}

async function handleNotification(userId: any) {
    try {
        const payload = {
            userId: userId,
            data: null
        }
        const notifications = await notificationService.fetchUserNotifications(payload);
        console.table(notifications);
        showChefOptions(userId);
    } catch(error) {
        console.log(error);
    }
}

function handleLogout() {
    authService.logout();
}

function isValidItemsSelected(selectedItems: number[], menuItems:RecommendedMenu[], category:string): boolean {
    if(!areAllItemsUnique(selectedItems)) return false;
    return selectedItems.every((id: number) => menuItems.some((item) => {
        if(category === 'breakfast') {
            return item.menuId === id && 'Breakfast' === item.categoryName;
        } else {
            return item.menuId === id && 'Breakfast' !== item.categoryName;
        }
    }));
}

function isValidFinalItemsSelected(selectedItems: number[], menuItems:FinalizedMenuItem[]): boolean {
    if(!areAllItemsUnique(selectedItems)) return false;

    return selectedItems.every((id: number) => menuItems.some((item) => {
        return item.menuItemId === id;
    }));
}