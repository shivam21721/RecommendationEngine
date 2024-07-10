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
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
const feedbackService = new FeedbackService_1.FeedbackService(AuthService_1.socket);
const notificationService = new NotificationService_1.NotificationService(AuthService_1.socket);
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
            default:
                console.log('Invalid Choice');
                showEmployeeOptions(userId);
        }
    });
}
function handleViewTodayMenu(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todayMenu = yield menuItemService.getTodayMenu();
            console.table(todayMenu);
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log("Error: ", error);
        }
    });
}
function handleViewNextDayMenu(userId) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function handleViewRolledOutMenu(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rolledOutMenu = yield menuItemService.getRolledOutMenu();
            console.table(rolledOutMenu);
            const votedItems = yield (0, readline_1.asyncUserInput)('Enter the comma seperated menu items id to vote: ');
            const voteResponse = yield menuItemService.voteForMenuItem([...votedItems.split(',')]);
            if (voteResponse) {
                console.log("Items successfully voted");
            }
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log('Error:', error);
        }
    });
}
function handleFeedback(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todayMenu = yield menuItemService.getTodayMenu();
            console.table(todayMenu);
            const menuItemId = yield (0, readline_1.asyncUserInput)("Enter the Menu Item Id for feedback: ");
            const comment = yield (0, readline_1.asyncUserInput)("Enter your feedback comment: ");
            const rating = yield (0, readline_1.asyncUserInput)("Rate the menu on the scale of 1 to 5: ");
            const feedbacResponse = yield feedbackService.addFeedback({ userId, menuItemId, comment, rating });
            if (feedbacResponse) {
                console.log('Feedback submitted successfully');
            }
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
            const notifications = yield notificationService.fetchUserNotifications(userId);
            console.table(notifications);
            showEmployeeOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
