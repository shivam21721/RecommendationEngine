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
exports.RecommendationController = void 0;
const RecommendationService_1 = require("../services/RecommendationService");
class RecommendationController {
    constructor() {
        this.recommendationService = new RecommendationService_1.RecommendationService();
    }
    getNextDayMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedMenu = yield this.recommendationService.getNextDayMenuRecommendation();
                return recommendedMenu;
            }
            catch (error) {
                return error;
            }
        });
    }
    rolloutItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.recommendationService.rolloutItems(itemIds);
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
    fetchFinalMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedMenu = yield this.recommendationService.fetchFinalMenuRecommendation();
                return recommendedMenu;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.RecommendationController = RecommendationController;
