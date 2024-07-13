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
exports.showChefOptions = void 0;
const AuthService_1 = require("../services/AuthService");
const readline_1 = require("../readline");
const MenuItemService_1 = require("../services/MenuItemService");
const NotificationService_1 = require("../services/NotificationService");
const RecommendationService_1 = require("../services/RecommendationService");
const Menu_1 = require("../../utils/Menu");
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
const notificationService = new NotificationService_1.NotificationService(AuthService_1.socket);
const recommendationService = new RecommendationService_1.RecommendationService(AuthService_1.socket);
var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. VIEW NOTIFICATIONS',
    '6. VIEW FEEDBACKS',
    'X. LOGOUT'
];
function showChefOptions(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        chefOptions.forEach((option) => {
            console.log(option);
        });
        const choice = yield (0, readline_1.asyncUserInput)('Enter your choice: ');
        handleChefChoice(choice, userId);
    });
}
exports.showChefOptions = showChefOptions;
function handleChefChoice(choice, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (choice) {
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
            case '5':
                break;
            case '6':
                break;
            default:
                console.log('Invalid Choice');
        }
    });
}
function handleViewMenuItem(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield menuItemService.getMenuItems();
            (0, Menu_1.showCategoryBasedMenuItems)(menuItems);
            showChefOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
function handleRollOutItemsForNextDay(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield recommendationService.getNextDayMenuRecommendation();
            (0, Menu_1.showCategoryBasedMenuItems)(menuItems);
            const selectedBreakfastItems = yield (0, readline_1.asyncUserInput)('Enter comma separated breakfast items to roll out: ');
            const selectedLunchItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Lunch items to roll out: ');
            const selectedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Dinner items to roll out: ');
            const validationDetail = yield recommendationService.validateSelectedItems({ breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems }, menuItems);
            var selectedItems = {
                breakfast: selectedBreakfastItems.split(','),
                lunch: selectedLunchItems.split(','),
                dinner: selectedDinnerItems.split(',')
            };
            const response = yield recommendationService.rollOutItems(selectedItems);
            showChefOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
function handleRolloutFinalizedItems(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield recommendationService.getFinalMenuRecommendation();
            console.log('BREAKFAST ITEMS');
            console.table(menuItems.breakfast);
            console.log('LUNCH ITEMS');
            console.table(menuItems.lunch);
            console.log('DINNER ITEMS');
            console.table(menuItems.dinner);
            const selectedBreakfastItems = yield (0, readline_1.asyncUserInput)('Enter comma separated breakfast items to roll out: ');
            const selectedLunchItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Lunch items to roll out: ');
            const selectedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Dinner items to roll out: ');
            const validationDetail = yield recommendationService.validateSelectedItems({ breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems }, menuItems);
            const response = yield recommendationService.rolloutFinalizedItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
            showChefOptions(userId);
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
            console.log(notifications);
            showChefOptions(userId);
        }
        catch (error) {
            console.log(error);
        }
    });
}
