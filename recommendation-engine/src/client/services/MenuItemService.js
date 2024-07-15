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
class MenuItemService {
    constructor(socket) {
        this.socket = socket;
    }
    getMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getMenuItems');
                this.socket.once('getMenuItemsResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    addMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('addMenuItem', payload);
                this.socket.once('addMenuItemResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    deleteMenuItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('deleteMenuItem', itemId);
                this.socket.once('deleteMenuItemResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    updateMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('updateMenuItem', itemData);
                this.socket.once('updateMenuItemResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    getTodayMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getTodayMenu');
                this.socket.on('getTodayMenuResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    getRolledOutMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getRolledOutMenu');
                this.socket.on('getRolledOutMenuResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    voteForMenuItem(items) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('voteMenuItems', items);
                this.socket.on('voteMenuItemsResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    fetchNextDayFinalizedMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('fetchNextDayFinalizedMenu');
                this.socket.on('fetchNextDayFinalizedMenuResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
}
exports.MenuItemService = MenuItemService;
