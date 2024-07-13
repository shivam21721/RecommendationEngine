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
exports.FeedbackService = void 0;
const FeedbackRepository_1 = require("../repositories/FeedbackRepository");
const Sentiment_1 = require("../utils/Sentiment");
class FeedbackService {
    constructor() {
        this.feedbackRepository = new FeedbackRepository_1.FeedbackRepository();
    }
    addMenuFeedback(feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                const dateString = date.toISOString().slice(0, 10);
                const sentimentScore = (0, Sentiment_1.sentimentScoreGenerator)(feedback.comment);
                feedback = Object.assign(Object.assign({}, feedback), { feedbackDate: dateString, sentimentScore });
                const response = yield this.feedbackRepository.addFeedback(feedback);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
}
exports.FeedbackService = FeedbackService;
