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
exports.RecommendationService = void 0;
const RecommendationRepository_1 = require("../repositories/RecommendationRepository");
const NotificationService_1 = require("./NotificationService");
const RecommendationEngine_1 = require("../utils/RecommendationEngine");
const Menu_1 = require("../utils/Menu");
class RecommendationService {
    constructor() {
        this.recommendationRepository = new RecommendationRepository_1.RecommendationRepository();
        this.notificationService = new NotificationService_1.NotificationService();
    }
    getNextDayMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedMenu = yield this.recommendationRepository.getMenuForRecommendation();
                const preparedRecommendation = (0, RecommendationEngine_1.prepareRecommendation)(recommendedMenu);
                const response = {
                    status: 'success',
                    message: 'Successfully fetched next day menu recommendation menu',
                    data: preparedRecommendation
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    rolloutItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var breakfastItems = items.breakfast.map((id) => {
                    const date = new Date();
                    return { id: parseInt(id), mealType: 'breakfast', date: date.toISOString().slice(0, 10) };
                });
                var lunchItems = items.lunch.map((id) => {
                    const date = new Date();
                    return { id: parseInt(id), mealType: 'lunch', date: date.toISOString().slice(0, 10) };
                });
                var dinnerItems = items.dinner.map((id) => {
                    const date = new Date();
                    return { id: parseInt(id), mealType: 'dinner', date: date.toISOString().slice(0, 10) };
                });
                const itemsCount = yield this.recommendationRepository.addRecommendedItems([...breakfastItems, ...lunchItems, ...dinnerItems]);
                const notificationResponse = yield this.notificationService.sendNotificationForRolledOutItems();
                const response = {
                    status: 'success',
                    message: `Successfully rolled out ${itemsCount} menu Items`,
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchFinalMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedMenu = yield this.recommendationRepository.fetchFinalMenuRecommendation();
                const sortedRecommendedMenu = (0, RecommendationEngine_1.prepareRecommendationForFinalMenu)(recommendedMenu);
                const finalRecommendedMenuData = {};
                finalRecommendedMenuData.breakfast = sortedRecommendedMenu.filter((item) => {
                    if (item.mealType === 'breakfast')
                        return true;
                    return false;
                });
                finalRecommendedMenuData.lunch = sortedRecommendedMenu.filter((item) => {
                    if (item.mealType === 'lunch')
                        return true;
                    return false;
                });
                finalRecommendedMenuData.dinner = sortedRecommendedMenu.filter((item) => {
                    if (item.mealType === 'dinner')
                        return true;
                    return false;
                });
                const response = {
                    status: 'success',
                    message: 'Successfully sent the notification',
                    data: finalRecommendedMenuData
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    rolloutFinalizedMenuItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemsCount = yield this.recommendationRepository.markItemAsPrepared(itemIds);
                const notificationResponse = yield this.notificationService.sendNotificationForFinalizedMenuItems();
                const response = {
                    status: 'success',
                    message: 'Successfully Rolled out finalized Menu Items',
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getPreparedMenuForToday() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItems = yield this.recommendationRepository.getPreparedMenuForToday();
                const menuItemsData = {};
                menuItemsData.breakfast = menuItems.filter((item) => {
                    if (item.mealType === 'breakfast')
                        return true;
                    return false;
                });
                menuItemsData.lunch = menuItems.filter((item) => {
                    if (item.mealType === 'lunch')
                        return true;
                    return false;
                });
                menuItemsData.dinner = menuItems.filter((item) => {
                    if (item.mealType === 'dinner')
                        return true;
                    return false;
                });
                const response = {
                    status: 'success',
                    message: 'Successfully fetched Menu for today',
                    data: menuItemsData
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getNextDayFinalizedMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItems = yield this.recommendationRepository.getNextDayFinalizedMenu();
                const menuItesData = (0, Menu_1.constructMenu)(menuItems);
                const response = {
                    status: 'success',
                    message: 'Successfully fetched all the menu Items',
                    data: menuItesData
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RecommendationService = RecommendationService;
