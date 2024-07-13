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
exports.RecommendationService = void 0;
class RecommendationService {
    constructor(socket) {
        this.socket = socket;
    }
    getNextDayMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getNextDayMenuRecommendation');
                this.socket.once('getNextDayMenuRecommendationResponse', (menuItems) => {
                    if (menuItems) {
                        resolve(menuItems);
                    }
                    else {
                        reject(new Error('Failed to get menu items.'));
                    }
                });
            });
        });
    }
    ;
    getFinalMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('getFinalMenuRecommendation');
                this.socket.once('getFinalMenuRecommendationResponse', (menuItems) => {
                    if (menuItems) {
                        resolve(menuItems);
                    }
                    else {
                        reject(new Error('Failed to get menu items.'));
                    }
                });
            });
        });
    }
    validateSelectedItems(selectedItems, menuItems) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    rollOutItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('rolloutItemsChoiceForNextDay', items);
                this.socket.on('rolloutItemsChoiceForNextDayResponse', (response) => {
                    if (response) {
                        resolve(response);
                    }
                    else {
                        reject(new Error('Failed to rollOutItms'));
                    }
                });
            });
        });
    }
    rolloutFinalizedItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('rolloutFinalizedItems', itemIds);
                this.socket.on('rolloutFinalizedItemsResponse', (response) => {
                    if (response) {
                        resolve(response);
                    }
                    else {
                        reject(new Error('Failed to rollOutItems'));
                    }
                });
            });
        });
    }
}
exports.RecommendationService = RecommendationService;
