import { socket } from "../services/AuthService";
import { asyncUserInput } from "../readline";
import { MenuItemService } from "../services/MenuItemService";
import { FeedbackService } from "../services/FeedbackService";
import { NotificationService } from "../services/NotificationService";
import { showMenu } from "../../utils/Menu";
import { RolledOutMenuItem } from "../../interfaces/Interface";
import { areAllItemsUnique } from "../../utils/Validation";
import { AuthService } from "../services/AuthService";

const menuItemService = new MenuItemService(socket);
const feedbackService = new FeedbackService(socket);
const notificationService = new NotificationService(socket);
const authService = new AuthService();

const adminOptions = [
    "1. VIEW TODAY'S MENU",
    "2. VIEW FINALIZED MENU FOR NEXT DAY",
    "3. VIEW ROLLED OUT MENU CHOICE",
    "4. VIEW NOTIFICATION",
    "5. GIVE FEEDBACK", 
    "X. LOGOUT"
];

export async function showEmployeeOptions(userId: number) {
    adminOptions.forEach((option) => {
        console.log(option);
    });

    const choice = await asyncUserInput('Enter your choice: ');
    handleEmployeeChoice(choice, userId);
}

async function handleEmployeeChoice(choice: string, userId: number) {
    switch(choice) {
        case '1':
            handleViewTodayMenu(userId);
            break;
        case '2':
            handleViewNextDayMenu(userId);
            break;
        case '3':
            handleViewRolledOutMenu(userId);
            break;
        case '4':
            handleNotification(userId);
            break;
        case '5':
            handleFeedback(userId);
            break;
        case 'X':
            handleLogout();
            break;
        default:
            console.log('Invalid Choice');
            showEmployeeOptions(userId);
    }
}

async function handleViewTodayMenu(userId: number) {
    try {
        const payload = {
            userId: userId,
            data: null
        }
        const menuItems: any = await menuItemService.getTodayMenu(payload);
        showMenu(menuItems);
        showEmployeeOptions(userId);
    } catch (error) {
        console.log("Error: ", (error as Error).message);
    }
}

async function handleViewNextDayMenu(userId: any) {
    try {
        const payload = {
            userId: userId,
            data: null
        }
        const menuItems = await menuItemService.fetchNextDayFinalizedMenu(payload);
        showMenu(menuItems);
        showEmployeeOptions(userId);
    } catch(error) {
        console.log('Error: ', error);
    }
}

async function handleViewRolledOutMenu(userId: number) {
    try {
        const rolledOutMenuPayload = {
            userId: userId,
            data: null
        }
        const menuItems: any = await menuItemService.getRolledOutMenu(rolledOutMenuPayload);
        showMenu(menuItems);
        const votedBreakfastItems = await asyncUserInput('Enter the comma seperated breakfast menu items id to vote: ');
        const votedBreakfastItemsList = votedBreakfastItems.split(',').map(item => Number(item));
        if(!isValidVotedItems(votedBreakfastItemsList, menuItems.breakfast)) {
            throw new Error("Invalid items selected for voting");
        }

        const votedLunchItems = await asyncUserInput('Enter the comma seperated lunch menu items id to vote: ');
        const votedLunchItemsList = votedLunchItems.split(',').map(item => Number(item));
        if(!isValidVotedItems(votedLunchItemsList, menuItems.lunch)) {
            throw new Error("Invalid items selected for voting");
        }

        const votedDinnerItems = await asyncUserInput('Enter the comma seperated dinner menu items id to vote: ');
        const votedDinnerItemsList = votedDinnerItems.split(',').map(item => Number(item));
        if(!isValidVotedItems(votedDinnerItemsList, menuItems.dinner)) {
            throw new Error("Invalid items selected for voting");
        }

        const selectedItems = {
            breakfast: votedBreakfastItemsList,
            lunch: votedLunchItemsList,
            dinner: votedDinnerItemsList
        }

        const payload = {
            userId: userId,
            data: selectedItems
        }

        const voteResponse = await menuItemService.voteForMenuItem(payload);
        if(voteResponse) {
            console.log("Items successfully voted");
        }
        showEmployeeOptions(userId);
    } catch(error) {
        console.log('Error:', (error as Error).message);
        showEmployeeOptions(userId);
    }
}

async function handleFeedback(userId: number) {
    try {
        const todayMenu = await menuItemService.getTodayMenu({userId: userId, data: null});
        console.table(todayMenu);
        const menuItemId = await asyncUserInput("Enter the Menu Item Id for feedback: ");
        const comment = await asyncUserInput("Enter your feedback comment: ");
        const rating = await asyncUserInput("Rate the menu on the scale of 1 to 5: ");

        const payload = {
            userId: userId,
            data: {userId, menuItemId: parseInt(menuItemId), comment, rating: parseInt(rating)}
        }
        const feedbacResponse = await feedbackService.addFeedback(payload);
        console.log(feedbacResponse);
        showEmployeeOptions(userId);

    } catch(error) {
        console.log('Error: ', error);
        
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
        showEmployeeOptions(userId);
    } catch(error) {
        console.log('Error: ', error);
    }
}

function handleLogout() {
    authService.logout();
}

function isValidVotedItems(votedItems:number[], menuItems: RolledOutMenuItem[]) {
    if(!areAllItemsUnique(votedItems)) return false;
    return votedItems.every((id: number) => menuItems.some((item) => {
        return item.menuItemId === id;
    }));
}