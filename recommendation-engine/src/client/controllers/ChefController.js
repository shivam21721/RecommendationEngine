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
const Validation_1 = require("../../utils/Validation");
const AuthService_2 = require("../services/AuthService");
const authService = new AuthService_2.AuthService();
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
const notificationService = new NotificationService_1.NotificationService(AuthService_1.socket);
const recommendationService = new RecommendationService_1.RecommendationService(AuthService_1.socket);
var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. VIEW NOTIFICATIONS',
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
            case 'X':
                handleLogout();
                break;
            default:
                console.log('Invalid Choice');
                showChefOptions(userId);
        }
    });
}
function handleViewMenuItem(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = {
                userId: userId,
                data: null
            };
            const menuItems = yield menuItemService.getMenuItems(payload);
            console.table(menuItems);
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
            const selectedBreakfastItemsList = selectedBreakfastItems.split(',').map(id => Number(id));
            if (!isValidItemsSelected(selectedBreakfastItemsList, menuItems, 'breakfast')) {
                throw new Error('Invalid Items selected for breakfast, Please verify the menu items ids');
            }
            const selectedLunchItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Lunch items to roll out: ');
            const selectedLunchItemsList = selectedLunchItems.split(',').map(id => Number(id));
            if (!isValidItemsSelected(selectedLunchItemsList, menuItems, 'lunch')) {
                throw new Error('Invalid Items selected for Lunch, Please verify the menu items ids');
            }
            const selectedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Dinner items to roll out: ');
            const selectedDinnerItemsList = selectedDinnerItems.split(',').map(item => Number(item));
            if (!isValidItemsSelected(selectedDinnerItemsList, menuItems, 'dinner')) {
                throw new Error('Invalid Items selected for Dinner, Please verify the menu items ids');
            }
            var selectedItems = {
                breakfast: selectedBreakfastItemsList,
                lunch: selectedLunchItemsList,
                dinner: selectedDinnerItemsList
            };
            const payload = {
                userId: userId,
                data: selectedItems
            };
            const response = yield recommendationService.rollOutItems(payload);
            console.log(response);
            showChefOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error.message);
            showChefOptions(userId);
        }
    });
}
function handleRolloutFinalizedItems(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getFinalMenuRecommendationPayload = {
                userId: userId,
                data: null
            };
            const menuItems = yield recommendationService.getFinalMenuRecommendation(getFinalMenuRecommendationPayload);
            (0, Menu_1.showMenu)(menuItems);
            const selectedBreakfastItems = yield (0, readline_1.asyncUserInput)('Enter comma separated breakfast items to roll out: ');
            const selectedBreakfastItemsList = selectedBreakfastItems.split(',').map(id => Number(id));
            if (!isValidFinalItemsSelected(selectedBreakfastItemsList, menuItems.breakfast)) {
                throw new Error('Invalid Items selected for breakfast, Please verify the menu items ids');
            }
            const selectedLunchItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Lunch items to roll out: ');
            const selectedLunchItemsList = selectedLunchItems.split(',').map(id => Number(id));
            if (!isValidFinalItemsSelected(selectedLunchItemsList, menuItems.lunch)) {
                throw new Error('Invalid Items selected for Lunch, Please verify the menu items ids');
            }
            const selectedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Dinner items to roll out: ');
            const selectedDinnerItemsList = selectedDinnerItems.split(',').map(item => Number(item));
            if (!isValidFinalItemsSelected(selectedDinnerItemsList, menuItems.dinner)) {
                throw new Error('Invalid Items selected for Dinner, Please verify the menu items ids');
            }
            const selectedItems = {
                breakfast: selectedBreakfastItemsList,
                lunch: selectedLunchItemsList,
                dinner: selectedDinnerItemsList
            };
            const payload = {
                userId: userId,
                data: selectedItems
            };
            const response = yield recommendationService.rolloutFinalizedItems(payload);
            console.log(response);
            showChefOptions(userId);
        }
        catch (error) {
            console.log('Error: ', error.message);
            showChefOptions(userId);
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
            showChefOptions(userId);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function handleLogout() {
    authService.logout();
}
function isValidItemsSelected(selectedItems, menuItems, category) {
    if (!(0, Validation_1.areAllItemsUnique)(selectedItems))
        return false;
    return selectedItems.every((id) => menuItems.some((item) => {
        if (category === 'breakfast') {
            return item.menuId === id && 'Breakfast' === item.categoryName;
        }
        else {
            return item.menuId === id && 'Breakfast' !== item.categoryName;
        }
    }));
}
function isValidFinalItemsSelected(selectedItems, menuItems) {
    if (!(0, Validation_1.areAllItemsUnique)(selectedItems))
        return false;
    return selectedItems.every((id) => menuItems.some((item) => {
        return item.menuItemId === id;
    }));
}
