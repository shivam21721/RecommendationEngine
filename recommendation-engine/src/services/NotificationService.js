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
exports.NotificationService = void 0;
const NotificationRepository_1 = require("../repositories/NotificationRepository");
const UserService_1 = require("./UserService");
class NotificationService {
    constructor() {
        this.notificationRepository = new NotificationRepository_1.NotificationRepository();
        this.userService = new UserService_1.UserService();
    }
    sendNotificationForRolledOutItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = (new Date()).toISOString().slice(0, 10);
                const message = `Chef has rolled out the menu items for ${date}. Please view and rolled out menu items and vote your favorites items`;
                const type = 2;
                const notificationId = yield this.notificationRepository.addNotification({ message, date, type });
                const response = {
                    status: 'success',
                    message: 'Successfully sent the notification',
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendNotificationForFinalizedMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = (new Date()).toISOString().slice(0, 10);
                const message = `Chef has sent the finalized menu items for ${date}, you can check the menu`;
                const type = 2;
                const notificationId = yield this.notificationRepository.addNotification({ message, date, type });
                const response = {
                    status: 'success',
                    message: 'Successfully sent the notification',
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRole = yield this.userService.getUserRole(userId);
                const notifications = yield this.notificationRepository.getUserNotifications(userRole);
                const response = {
                    status: 'success',
                    message: 'Successfully sent the notification',
                    data: notifications
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.NotificationService = NotificationService;
