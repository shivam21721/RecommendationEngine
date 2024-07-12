import { socket } from "../services/AuthService";
import { asyncUserInput } from "../readline";
import { MenuItemService } from "../services/MenuItemService";
import { NotificationService } from "../services/NotificationService";
import { RecommendationService } from "../services/RecommendationService";

const menuItemService = new MenuItemService(socket);
const notificationService = new NotificationService(socket);
const recommendationService = new RecommendationService(socket);

var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. VIEW NOTIFICATIONS',
    '6. VIEW FEEDBACKS',
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
            try {
                const menuItems = await menuItemService.getMenuItems();
                console.log(menuItems);
                showChefOptions(userId);
            } catch(error) {
                console.log('Error: ', error);
            }
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
        case '5':
            
            break;
        case '6':
            
            break;
        default:
            console.log('Invalid Choice');
    }
}

async function handleRollOutItemsForNextDay(userId: any) {
    try {
        const menuItems = await recommendationService.getNextDayMenuRecommendation();
        console.table(menuItems);
        const selectedBreakfastItems = await asyncUserInput('Enter comma separated breakfast items to roll out: ');
        const selectedLunchItems = await asyncUserInput('Enter comma separated Lunch items to roll out: ');
        const selectedDinnerItems = await asyncUserInput('Enter comma separated Dinner items to roll out: ');
        const validationDetail = await recommendationService.validateSelectedItems({breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems}, menuItems);
        const response = await recommendationService.rollOutItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
        showChefOptions(userId);
    } catch(error) {
        console.log('Error: ',error);
    }
}

async function handleRolloutFinalizedItems(userId: any) {
    try {
        const menuItems = await recommendationService.getFinalMenuRecommendation();
        console.table(menuItems);
        const selectedBreakfastItems = await asyncUserInput('Enter comma separated breakfast items to roll out: ');
        const selectedLunchItems = await asyncUserInput('Enter comma separated Lunch items to roll out: ');
        const selectedDinnerItems = await asyncUserInput('Enter comma separated Dinner items to roll out: ');
        const validationDetail = await recommendationService.validateSelectedItems({breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems}, menuItems);
        const response = await recommendationService.rolloutFinalizedItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
        showChefOptions(userId);
    } catch(error) {
        console.log('Error: ',error);
    }
}

async function handleNotification(userId: any) {
    try {
        const notifications = await notificationService.fetchUserNotifications(userId);
        console.log(notifications);
        showChefOptions(userId);
    } catch(error) {
        console.log(error);
    }
}

