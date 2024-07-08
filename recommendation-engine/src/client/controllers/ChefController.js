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
const RecommendationService_1 = require("../services/RecommendationService");
const menuItemService = new MenuItemService_1.MenuItemService(AuthService_1.socket);
const recommendationService = new RecommendationService_1.RecommendationService(AuthService_1.socket);
var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. GENERATE REPORTS',
    '5. VIEW NOTIFICATIONS',
    '6. VIEW FEEDBACKS',
    'X. LOGOUT'
];
function showChefOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        chefOptions.forEach((option) => {
            console.log(option);
        });
        const choice = yield (0, readline_1.asyncUserInput)('Enter your choice: ');
        handleChefChoice(choice);
    });
}
exports.showChefOptions = showChefOptions;
function handleChefChoice(choice) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (choice) {
            case '1':
                try {
                    const menuItems = yield menuItemService.getMenuItems();
                    console.log(menuItems);
                    showChefOptions();
                }
                catch (error) {
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
    });
}
function handleRollOutItemsForNextDay() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield recommendationService.getNextDayMenuRecommendation();
            console.table(menuItems);
            const selectedBreakfastItems = yield (0, readline_1.asyncUserInput)('Enter comma separated breakfast items to roll out: ');
            const selectedLunchItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Lunch items to roll out: ');
            const selectedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Dinner items to roll out: ');
            const validationDetail = yield recommendationService.validateSelectedItems({ breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems }, menuItems);
            const response = yield recommendationService.rollOutItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
            showChefOptions();
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
function handleRolloutFinalizedItems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield recommendationService.getFinalMenuRecommendation();
            console.table(menuItems);
            const selectedBreakfastItems = yield (0, readline_1.asyncUserInput)('Enter comma separated breakfast items to roll out: ');
            const selectedLunchItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Lunch items to roll out: ');
            const selectedDinnerItems = yield (0, readline_1.asyncUserInput)('Enter comma separated Dinner items to roll out: ');
            const validationDetail = yield recommendationService.validateSelectedItems({ breakfast: selectedBreakfastItems, lunch: selectedLunchItems, dinner: selectedDinnerItems }, menuItems);
            const response = yield recommendationService.rollOutItems([...selectedBreakfastItems.split(','), ...selectedLunchItems.split(','), selectedDinnerItems.split(',')]);
            showChefOptions();
        }
        catch (error) {
            console.log('Error: ', error);
        }
    });
}
