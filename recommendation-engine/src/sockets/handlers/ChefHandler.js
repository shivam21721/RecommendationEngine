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
exports.handleChef = void 0;
const MenuItemController_1 = require("../../controllers/MenuItemController");
const NotificationController_1 = require("../../controllers/NotificationController");
const RecommendationController_1 = require("../../controllers/RecommendationController");
const menuItemController = new MenuItemController_1.MenuItemController();
const recommendationController = new RecommendationController_1.RecommendationController();
const notificationController = new NotificationController_1.NotificationController();
function handleChef(socket, user) {
    socket.on('getMenuItems', () => __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', menuItems);
    }));
    socket.on('getNextDayMenuRecommendation', () => __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield recommendationController.getNextDayMenuRecommendation();
        socket.emit('getNextDayMenuRecommendationResponse', menuItems);
    }));
    socket.on('rolloutItemsChoiceForNextDay', (items) => __awaiter(this, void 0, void 0, function* () {
        const response = yield recommendationController.rolloutItems(items);
        socket.emit('rolloutItemsChoiceForNextDayResponse', response);
    }));
    socket.on('getFinalMenuRecommendation', () => __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield recommendationController.fetchFinalMenuRecommendation();
        socket.emit('getFinalMenuRecommendationResponse', menuItems);
    }));
    socket.on('rolloutFinalizedItems', (items) => __awaiter(this, void 0, void 0, function* () {
        const response = recommendationController.rolloutFinalizedMenuItems(items);
        socket.emit('rolloutFinalizedItemsResponse', response);
    }));
    socket.on('fetchUserNotifications', (userId) => __awaiter(this, void 0, void 0, function* () {
        const notifications = yield notificationController.getUserNotifications(userId);
        socket.emit('fetchUserNotificationsResponse', notifications);
    }));
}
exports.handleChef = handleChef;
