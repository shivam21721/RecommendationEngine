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
    getMenuItems(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getMenuItems', payload);
                this.socket.once('getMenuItemsResponse', (response) => {
                    if ('success' === response.status) {
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
                    if ('success' === response.status) {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    deleteMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('deleteMenuItem', payload);
                this.socket.once('deleteMenuItemResponse', (response) => {
                    if ('success' === response.status) {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    updateMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('updateMenuItem', payload);
                this.socket.once('updateMenuItemResponse', (response) => {
                    if ('success' === response.status) {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    getTodayMenu(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getTodayMenu', payload);
                this.socket.on('getTodayMenuResponse', (response) => {
                    if ('success' === response.status) {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    getRolledOutMenu(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getRolledOutMenu', payload);
                this.socket.on('getRolledOutMenuResponse', (response) => {
                    if ('success' === response.status) {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    voteForMenuItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('voteMenuItems', payload);
                this.socket.on('voteMenuItemsResponse', (response) => {
                    if ('success' === response.status) {
                        resolve(response.message);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    fetchNextDayFinalizedMenu(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('fetchNextDayFinalizedMenu', payload);
                this.socket.on('fetchNextDayFinalizedMenuResponse', (response) => {
                    if ('success' === response.status) {
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
