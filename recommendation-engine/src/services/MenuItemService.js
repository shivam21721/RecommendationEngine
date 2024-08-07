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
const UserRepository_1 = require("../repositories/UserRepository");
const Menu_1 = require("../utils/Menu");
const NotificationService_1 = require("./NotificationService");
class MenuItemService {
    constructor() {
        this.menuItemRepository = new MenuItemRepository_1.MenuItemRepository();
        this.notificationService = new NotificationService_1.NotificationService();
        this.userRepository = new UserRepository_1.UserRepository();
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
                yield this.notificationService.sendNotificationToChef(`New menu item added, item id: ${menuItemId}`);
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
                yield this.notificationService.sendNotificationToChef(`Menu Item Deleted, item id: ${deletedItemId}`);
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
                yield this.notificationService.sendNotificationToChef(`Menu Item Updated, item id: ${updatedItemId}`);
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
    fetchRolledOutMenu(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItems = yield this.menuItemRepository.fetchRolledOutMenu();
                const { preferredSpicyLevel, preferredDietType, preferredCuisineType } = yield this.userRepository.getUserMenuItemPreferences(userId);
                const sortedMenuItems = (0, Menu_1.sortMenuItemsAccordingToUserPreference)(menuItems, preferredDietType, preferredCuisineType, preferredSpicyLevel);
                const mealTypeBasedMenuItems = (0, Menu_1.constructMenu)(sortedMenuItems);
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
    updateVotedMenuItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var breakfastItems = items.breakfast.map((id) => {
                    return { id, mealType: 'breakfast' };
                });
                var lunchItems = items.lunch.map((id) => {
                    return { id, mealType: 'lunch' };
                });
                var dinnerItems = items.dinner.map((id) => {
                    return { id, mealType: 'dinner' };
                });
                const updatedItemsCount = this.menuItemRepository.updateVotedMenuItems([...breakfastItems, ...lunchItems, ...dinnerItems]);
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
    getDiscardMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discardMenuItems = yield this.menuItemRepository.getDiscardMenuItems();
                const response = {
                    status: 'success',
                    message: 'Successfully fetched Discard Menu Items',
                    data: discardMenuItems
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
