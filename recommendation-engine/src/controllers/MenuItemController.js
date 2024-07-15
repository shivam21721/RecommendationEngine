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
exports.MenuItemController = void 0;
const MenuItemService_1 = require("../services/MenuItemService");
const RecommendationService_1 = require("../services/RecommendationService");
const Authorization_1 = require("../utils/Authorization");
const UserRoles_1 = require("../enums/UserRoles");
class MenuItemController {
    constructor() {
        this.menuItemService = new MenuItemService_1.MenuItemService();
        this.recommendationService = new RecommendationService_1.RecommendationService();
    }
    getMenuItems(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Admin, UserRoles_1.UserRole.Chef])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.menuItemService.getMenuItems();
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
    addMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Admin])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.menuItemService.addMenuItem(payload.data);
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
    deleteMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Admin])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.menuItemService.deleteMenuItem(payload.data);
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
    updateMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Admin])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.menuItemService.updateMenuItem(payload.data);
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
    getTodayMenu(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Employee])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.recommendationService.getPreparedMenuForToday();
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
    fetchRolledOutMenu(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Employee])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.menuItemService.fetchRolledOutMenu();
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
    updateVotedMenuItems(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Employee])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.menuItemService.updateVotedMenuItems(payload.data);
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
    getNextDayFinalizedMenu(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Employee])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.recommendationService.getNextDayFinalizedMenu();
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
exports.MenuItemController = MenuItemController;
