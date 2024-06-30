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
class MenuItemController {
    constructor() {
        this.menuItemService = new MenuItemService_1.MenuItemService();
    }
    getMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemService.getMenuItems();
        });
    }
    addMenuItem(name, categoryId, availability, price) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemService.addMenuItem(name, categoryId, availability, price);
        });
    }
    deleteMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.menuItemService.deleteMenuItem(id);
        });
    }
    updateMenuItem(id, name, categoryId, availability, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.menuItemService.updateMenuItem(id, name, categoryId, availability, price);
        });
    }
}
exports.MenuItemController = MenuItemController;
