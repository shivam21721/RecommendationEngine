import { socket } from "../services/AuthService";
import { asyncUserInput } from "../readline";
import { MenuItemService } from "../services/MenuItemService";
import { RecommendationService } from "../services/RecommendationService";

const menuItemService = new MenuItemService(socket);
const recommendationService = new RecommendationService(socket);

var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. GENERATE REPORTS',
    '5. VIEW NOTIFICATIONS',
    '6. VIEW FEEDBACKS',
    'X. LOGOUT'
]

export async function showChefOptions() {
    chefOptions.forEach((option) => {
        console.log(option);
    });

    const choice = await asyncUserInput('Enter your choice: ');
    handleChefChoice(choice);
}

async function handleChefChoice(choice: string) {
    switch(choice) {
        case '1':
            try {
                const menuItems = await menuItemService.getMenuItems();
                console.log(menuItems);
                showChefOptions();
            } catch(error) {
                console.log('Error: ', error);
            }
            break;
        case '2':
            handleRollOutItemsForNextDay();
            break;
        case '3':
            handleRolloutFinalizedItems();
            break;
        case '4':
            
            break;
        case '5':
            
            break;
        case '6':
            
            break;
        default:
            console.log('Invalid Choice');
    }
}

async function handleRollOutItemsForNextDay() {
    try {
        const menuItems = await recommendationService.getNextDayMenuRecommendation();
        console.table(menuItems);
        const selectedBreakfastItems = await asyncUserInput('Enter comma separated breakfast items to roll out: ');
        const selectedLunchItems = await asyncUserInput('Enter comma separated Lunch items to roll out: ');
        const selectedDinnerItems = await asyncUserInput('Enter comma separated Dinner items to roll out: ');
        const validationDetail = await recommendationService.validateSelectedItems({breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems}, menuItems);
        const response = await recommendationService.rollOutItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
        showChefOptions();
    } catch(error) {
        console.log('Error: ',error);
    }
}

async function handleRolloutFinalizedItems() {
    try {
        const menuItems = await recommendationService.getFinalMenuRecommendation();
        console.table(menuItems);
        const selectedBreakfastItems = await asyncUserInput('Enter comma separated breakfast items to roll out: ');
        const selectedLunchItems = await asyncUserInput('Enter comma separated Lunch items to roll out: ');
        const selectedDinnerItems = await asyncUserInput('Enter comma separated Dinner items to roll out: ');
        const validationDetail = await recommendationService.validateSelectedItems({breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems}, menuItems);
        const response = await recommendationService.rollOutItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
        showChefOptions();
    } catch(error) {
        console.log('Error: ',error);
    }
}

