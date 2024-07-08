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
const RecommendationRepository_1 = require("../repositories/RecommendationRepository");
const RecommendationEngine_1 = require("../utility/RecommendationEngine");
class RecommendationService {
    constructor() {
        this.recommendationRepository = new RecommendationRepository_1.RecommendationRepository();
    }
    getNextDayMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedMenu = yield this.recommendationRepository.getMenuForRecommendation();
                return (0, RecommendationEngine_1.prepareRecommendation)(recommendedMenu);
            }
            catch (error) {
                throw error;
            }
        });
    }
    rolloutItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            // var recommendedItemsDetails = [];
            try {
                var recommendedItemsData = itemIds.map((id) => {
                    const date = new Date();
                    console.log({ id: parseInt(id), date });
                    return { id: parseInt(id), date: date.toISOString().slice(0, 10) };
                });
                const response = yield this.recommendationRepository.addRecommendedItems(recommendedItemsData);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchFinalMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recommendedMenu = yield this.recommendationRepository.fetchFinalMenuRecommendation();
                return (0, RecommendationEngine_1.prepareRecommendationForFinalMenu)(recommendedMenu);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RecommendationService = RecommendationService;
