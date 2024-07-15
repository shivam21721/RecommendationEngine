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
exports.showEmployeeOptions = void 0;
const AuthService_1 = require("../services/AuthService");
const readline_1 = require("../readline");
const MenuItemService_1 = require("../services/MenuItemService");
const FeedbackService_1 = require("../services/FeedbackService");
const NotificationService_1 = require("../services/NotificationService");
const Menu_1 = require("../../utils/Menu");
const Validation_1 = require("../../utils/Validation");
const AuthService_2 = require("../services/AuthService");
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
const feedbackService = new FeedbackService_1.FeedbackService(AuthService_1.socket);
const notificationService = new NotificationService_1.NotificationService(AuthService_1.socket);
const authService = new AuthService_2.AuthService();
const adminOptions = [
    "1. VIEW TODAY'S MENU",
    "2. VIEW FINALIZED MENU FOR NEXT DAY",
    "3. VIEW ROLLED OUT MENU CHOICE",
    "4. VIEW NOTIFICATION",
    "5. GIVE FEEDBACK",
    "X. LOGOUT"
];
function showEmployeeOptions(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        adminOptions.forEach((option) => {
            console.log(option);
        });
        const choice = yield (0, readline_1.asyncUserInput)('Enter your choice: ');
        handleEmployeeChoice(choice, userId);
    });
}
exports.showEmployeeOptions = showEmployeeOptions;
function handleEmployeeChoice(choice, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (choice) {
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
    });
}
function handleViewTodayMenu(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                userId: userId,
                data: null
            };
            const menuItems = yield menuItemService.getTodayMenu(payload);
            (0, Menu_1.showMenu)(menuItems);
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log("Error: ", error.message);
        }
    });
}
function handleViewNextDayMenu(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                userId: userId,
                data: null
            };
            const menuItems = yield menuItemService.fetchNextDayFinalizedMenu(payload);
            (0, Menu_1.showMenu)(menuItems);
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
function handleViewRolledOutMenu(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rolledOutMenuPayload = {
                userId: userId,
                data: null
            };
            const menuItems = yield menuItemService.getRolledOutMenu(rolledOutMenuPayload);
            (0, Menu_1.showMenu)(menuItems);
            const votedBreakfastItems = yield (0, readline_1.asyncUserInput)('Enter the comma seperated breakfast menu items id to vote: ');
            const votedBreakfastItemsList = votedBreakfastItems.split(',').map(item => Number(item));
            if (!isValidVotedItems(votedBreakfastItemsList, menuItems.breakfast)) {
                throw new Error("Invalid items selected for voting");
            }
            const votedLunchItems = yield (0, readline_1.asyncUserInput)('Enter the comma seperated lunch menu items id to vote: ');
            const votedLunchItemsList = votedLunchItems.split(',').map(item => Number(item));
            if (!isValidVotedItems(votedLunchItemsList, menuItems.lunch)) {
                throw new Error("Invalid items selected for voting");
            }
            const votedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter the comma seperated dinner menu items id to vote: ');
            const votedDinnerItemsList = votedDinnerItems.split(',').map(item => Number(item));
            if (!isValidVotedItems(votedDinnerItemsList, menuItems.dinner)) {
                throw new Error("Invalid items selected for voting");
            }
            const selectedItems = {
                breakfast: votedBreakfastItemsList,
                lunch: votedLunchItemsList,
                dinner: votedDinnerItemsList
            };
            const payload = {
                userId: userId,
                data: selectedItems
            };
            const voteResponse = yield menuItemService.voteForMenuItem(payload);
            if (voteResponse) {
                console.log("Items successfully voted");
            }
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log('Error:', error.message);
            showEmployeeOptions(userId);
        }
    });
}
function handleFeedback(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todayMenu = yield menuItemService.getTodayMenu({ userId: userId, data: null });
            console.table(todayMenu);
            const menuItemId = yield (0, readline_1.asyncUserInput)("Enter the Menu Item Id for feedback: ");
            const comment = yield (0, readline_1.asyncUserInput)("Enter your feedback comment: ");
            const rating = yield (0, readline_1.asyncUserInput)("Rate the menu on the scale of 1 to 5: ");
            const payload = {
                userId: userId,
                data: { userId, menuItemId: parseInt(menuItemId), comment, rating: parseInt(rating) }
            };
            const feedbacResponse = yield feedbackService.addFeedback(payload);
            console.log(feedbacResponse);
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
function handleNotification(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                userId: userId,
                data: null
            };
            const notifications = yield notificationService.fetchUserNotifications(payload);
            console.table(notifications);
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
function handleLogout() {
    authService.logout();
}
function isValidVotedItems(votedItems, menuItems) {
    if (!(0, Validation_1.areAllItemsUnique)(votedItems))
        return false;
    return votedItems.every((id) => menuItems.some((item) => {
        return item.menuItemId === id;
    }));
}
