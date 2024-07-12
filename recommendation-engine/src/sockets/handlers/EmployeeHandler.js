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
exports.handleEmployee = void 0;
const MenuItemController_1 = require("../../controllers/MenuItemController");
const FeedbackController_1 = require("../../controllers/FeedbackController");
const NotificationController_1 = require("../../controllers/NotificationController");
const menuItemController = new MenuItemController_1.MenuItemController();
const feedbackController = new FeedbackController_1.FeedbackController();
const notificationController = new NotificationController_1.NotificationController();
function handleEmployee(socket, user) {
    socket.on('getTodayMenu', () => __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield menuItemController.getTodayMenu();
        socket.emit('getTodayMenuResponse', menuItems);
    }));
    socket.on('getRolledOutMenu', () => __awaiter(this, void 0, void 0, function* () {
        const rolledOutMenu = yield menuItemController.fetchRolledOutMenu();
        socket.emit('getRolledOutMenuResponse', rolledOutMenu);
    }));
    socket.on('voteMenuItems', (itemIds) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.updateVotedMenuItems(itemIds);
        socket.emit('voteMenuItemsResponse', response);
    }));
    socket.on('addFeedback', (feedback) => __awaiter(this, void 0, void 0, function* () {
        const response = yield feedbackController.addMenuFeedback(feedback);
        socket.emit('addFeedbackResponse', response);
    }));
    socket.on('fetchUserNotifications', (userId) => __awaiter(this, void 0, void 0, function* () {
        const notifications = yield notificationController.getUserNotifications(userId);
        socket.emit('fetchUserNotificationsResponse', notifications);
    }));
    socket.on('fetchNextDayFinalizedMenu', () => __awaiter(this, void 0, void 0, function* () {
        const menuItems = yield menuItemController.getNextDayFinalizedMenu();
        socket.emit('fetchNextDayFinalizedMenuResponse', menuItems);
    }));
}
exports.handleEmployee = handleEmployee;
