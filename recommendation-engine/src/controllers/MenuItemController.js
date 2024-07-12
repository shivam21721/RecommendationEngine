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
class MenuItemController {
    constructor() {
        this.menuItemService = new MenuItemService_1.MenuItemService();
        this.recommendationService = new RecommendationService_1.RecommendationService();
    }
    getMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemService.getMenuItems();
        });
    }
    addMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemService.addMenuItem(itemData);
        });
    }
    deleteMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemService.deleteMenuItem(id);
        });
    }
    updateMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemService.updateMenuItem(itemData);
        });
    }
    getTodayMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.recommendationService.getPreparedMenuForToday();
            return response;
        });
    }
    fetchRolledOutMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.menuItemService.fetchRolledOutMenu();
            return response;
        });
    }
    updateVotedMenuItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.menuItemService.updateVotedMenuItems(itemIds);
            return response;
        });
    }
    getNextDayFinalizedMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItems = yield this.recommendationService.getNextDayFinalizedMenu();
                return menuItems;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.MenuItemController = MenuItemController;
