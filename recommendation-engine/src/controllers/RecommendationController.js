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
const Authorization_1 = require("../utils/Authorization");
const UserRoles_1 = require("../enums/UserRoles");
class RecommendationController {
    constructor() {
        this.recommendationService = new RecommendationService_1.RecommendationService();
    }
    getNextDayMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.recommendationService.getNextDayMenuRecommendation();
                return response;
            }
            catch (error) {
                console.error(error);
                const response = {
                    status: 'error',
                    message: error.message,
                    data: []
                };
                return response;
            }
        });
    }
    rolloutItems(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Chef])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.recommendationService.rolloutItems(payload.data);
                return response;
            }
            catch (error) {
                console.error(error);
                const response = {
                    status: 'error',
                    message: error.message,
                    data: []
                };
                return response;
            }
        });
    }
    fetchFinalMenuRecommendation(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Chef])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.recommendationService.fetchFinalMenuRecommendation();
                return response;
            }
            catch (error) {
                console.error(error);
                const response = {
                    status: 'error',
                    message: error.message,
                    data: []
                };
                return response;
            }
        });
    }
    rolloutFinalizedMenuItems(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, Authorization_1.isAuthorizedUser)(payload.userId, [UserRoles_1.UserRole.Chef])) {
                    throw new Error("Unauthorized user");
                }
                const response = yield this.recommendationService.rolloutFinalizedMenuItems(payload.data);
                return response;
            }
            catch (error) {
                console.error(error);
                const response = {
                    status: 'error',
                    message: error.message,
                    data: []
                };
                return response;
            }
        });
    }
}
exports.RecommendationController = RecommendationController;
