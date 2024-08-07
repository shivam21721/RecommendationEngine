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
function handleEmployee(socket) {
    socket.on('getTodayMenu', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.getTodayMenu(payload);
        socket.emit('getTodayMenuResponse', response);
    }));
    socket.on('getRolledOutMenu', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.fetchRolledOutMenu(payload);
        socket.emit('getRolledOutMenuResponse', response);
    }));
    socket.on('voteMenuItems', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.updateVotedMenuItems(payload);
        socket.emit('voteMenuItemsResponse', response);
    }));
    socket.on('addFeedback', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield feedbackController.addMenuFeedback(payload);
        socket.emit('addFeedbackResponse', response);
    }));
    socket.on('fetchUserNotifications', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield notificationController.getUserNotifications(payload);
        socket.emit('fetchUserNotificationsResponse', response);
    }));
    socket.on('fetchNextDayFinalizedMenu', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.getNextDayFinalizedMenu(payload);
        socket.emit('fetchNextDayFinalizedMenuResponse', response);
    }));
}
exports.handleEmployee = handleEmployee;
