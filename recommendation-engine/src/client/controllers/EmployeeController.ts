import { socket } from "../services/AuthService";
import { asyncUserInput } from "../readline";
import { MenuItemService } from "../services/MenuItemService";
import { FeedbackService } from "../services/FeedbackService";
import { NotificationService } from "../services/NotificationService";
import { showMenu } from "../../utils/Menu";

const menuItemService = new MenuItemService(socket);
const feedbackService = new FeedbackService(socket);
const notificationService = new NotificationService(socket);

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
        default:
            console.log('Invalid Choice');
            showEmployeeOptions(userId);
    }
}

async function handleViewTodayMenu(userId: number) {
    try {
        const menuItems: any = await menuItemService.getTodayMenu();
        showMenu(menuItems);
        showEmployeeOptions(userId);
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function handleViewNextDayMenu(userId: any) {
    try {
        const menuItems = await menuItemService.fetchNextDayFinalizedMenu();
        showMenu(menuItems);
        showEmployeeOptions(userId);
    } catch(error) {
        console.log('Error: ', error);
    }
}

async function handleViewRolledOutMenu(userId: number) {
    try {
        const menuItems = await menuItemService.getRolledOutMenu();
        showMenu(menuItems);
        const votedItems = await asyncUserInput('Enter the comma seperated menu items id to vote: ');
        const voteResponse = await menuItemService.voteForMenuItem([...votedItems.split(',')]);
        if(voteResponse) {
            console.log("Items successfully voted");
        }
        showEmployeeOptions(userId);
    } catch(error) {
        console.log('Error:', error);
    }
}

async function handleFeedback(userId: number) {
    try {
        const todayMenu = await menuItemService.getTodayMenu();
        console.table(todayMenu);
        const menuItemId = await asyncUserInput("Enter the Menu Item Id for feedback: ");
        const comment = await asyncUserInput("Enter your feedback comment: ");
        const rating = await asyncUserInput("Rate the menu on the scale of 1 to 5: ");
        const feedbacResponse = await feedbackService.addFeedback({userId, menuItemId, comment, rating});
        if(feedbacResponse) {
            console.log('Feedback submitted successfully');
        }
        showEmployeeOptions(userId);

    } catch(error) {
        console.log('Error: ', error);
    }
}

async function handleNotification(userId: any) {
    try {
        const notifications = await notificationService.fetchUserNotifications(userId);
        console.table(notifications);
        showEmployeeOptions(userId);
    } catch(error) {
        console.log('Error: ', error);
    }
}