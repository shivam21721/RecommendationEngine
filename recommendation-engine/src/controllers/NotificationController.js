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
exports.NotificationController = void 0;
const NotificationService_1 = require("../services/NotificationService");
class NotificationController {
    constructor() {
        this.notificationService = new NotificationService_1.NotificationService();
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.notificationService.getUserNotifications(userId);
                return response;
            }
            catch (error) {
                console.error(error);
                const response = {
                    status: 'error',
                    message: error.message,
                    data: []
                };
                return response;
            }
        });
    }
}
exports.NotificationController = NotificationController;
