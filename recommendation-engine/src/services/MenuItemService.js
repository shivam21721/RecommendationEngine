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
exports.MenuItemService = void 0;
const MenuItemRepository_1 = require("../repositories/MenuItemRepository");
class MenuItemService {
    constructor() {
        this.menuItemRepository = new MenuItemRepository_1.MenuItemRepository();
    }
    getMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemRepository.getAllMenuItems();
        });
    }
    addMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemRepository.addMenuItem(itemData);
        });
    }
    deleteMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemRepository.deleteMenuItem(id);
        });
    }
    updateMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemRepository.updateMenuItem(itemData);
        });
    }
    fetchRolledOutMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemRepository.fetchRolledOutMenu();
        });
    }
    updateVotedMenuItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.menuItemRepository.updateVotedMenuItems(itemIds);
        });
    }
}
exports.MenuItemService = MenuItemService;
