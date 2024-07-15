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
const UserRoles_1 = require("../enums/UserRoles");
const Authorization_1 = require("../utils/Authorization");
class NotificationController {
    constructor() {
        this.notificationService = new NotificationService_1.NotificationService();
    }
    getUserNotifications(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Chef, UserRoles_1.UserRole.Employee])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.notificationService.getUserNotifications(payload.userId);
                return response;
            }
            catch (error) {
                console.error(error.message);
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
