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
exports.handleAdmin = void 0;
const MenuItemController_1 = require("../../controllers/MenuItemController");
const menuItemController = new MenuItemController_1.MenuItemController();
function handleAdmin(socket, user) {
    socket.on('getMenuItems', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', response);
    }));
    socket.on('addMenuItem', (payload) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.addMenuItem(payload);
        socket.emit('addMenuItemResponse', response);
    }));
    socket.on('deleteMenuItem', (id) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.deleteMenuItem(id);
        socket.emit('deleteMenuItemResponse', response);
    }));
    socket.on('updateMenuItem', (itemData) => __awaiter(this, void 0, void 0, function* () {
        const response = yield menuItemController.updateMenuItem(itemData);
        socket.emit('updateMenuItemResponse', response);
    }));
}
exports.handleAdmin = handleAdmin;
