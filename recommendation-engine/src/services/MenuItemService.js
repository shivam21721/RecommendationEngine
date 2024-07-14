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
const Menu_1 = require("../utils/Menu");
class MenuItemService {
    constructor() {
        this.menuItemRepository = new MenuItemRepository_1.MenuItemRepository();
    }
    getMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItems = yield this.menuItemRepository.getAllMenuItems();
                const response = {
                    status: 'success',
                    message: 'Successfully fetched all the menu Items',
                    data: menuItems
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItemId = yield this.menuItemRepository.addMenuItem(itemData);
                const response = {
                    status: 'success',
                    message: `Menu Item Successfully added with id: ${menuItemId}`,
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedItemId = yield this.menuItemRepository.deleteMenuItem(id);
                const response = {
                    status: 'success',
                    message: `Menu Item Successfully Deleted with id: ${deletedItemId}`,
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedItemId = yield this.menuItemRepository.updateMenuItem(itemData);
                const response = {
                    status: 'success',
                    message: `Menu Item Successfully Deleted with id: ${updatedItemId}`,
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchRolledOutMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItems = yield this.menuItemRepository.fetchRolledOutMenu();
                const mealTypeBasedMenuItems = (0, Menu_1.constructMenu)(menuItems);
                const response = {
                    status: 'success',
                    message: `Successfully fetched the menu items`,
                    data: mealTypeBasedMenuItems
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateVotedMenuItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedItemsCount = this.menuItemRepository.updateVotedMenuItems(itemIds);
                const response = {
                    status: 'success',
                    message: `${updatedItemsCount}Items successfully voted`,
                    data: []
                };
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MenuItemService = MenuItemService;
