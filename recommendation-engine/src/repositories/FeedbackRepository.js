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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class FeedbackRepository {
    constructor() {
        this.pool = db_1.default.getPool();
    }
    addFeedback(feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            const { userId, menuItemId, comment, rating, sentimentScore, feedbackDate } = feedback;
            try {
                const [result] = yield connection.execute('INSERT INTO Feedback (userId, menuItemId, comment, rating, sentimentScore, feedbackDate) VALUES (?, ?, ?, ?, ?, ?)', [userId, menuItemId, comment, rating, sentimentScore, feedbackDate]);
                return result.insertId;
            }
            catch (error) {
                console.error('Error adding feedback:', error);
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    ;
    getAllFeedbackByMenuItem(menuItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const [rows] = yield connection.execute('SELECT * FROM Feedback WHERE menuItemId = ?', [menuItemId]);
                return rows;
            }
            catch (error) {
                console.error('Error fetching feedback:', error);
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    ;
    getAverageSentimentScoreByMenuItem(menuItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const [result] = yield connection.execute('SELECT AVG(sentimentScore) AS avgSentimentScore FROM Feedback WHERE menuItemId = ?', [menuItemId]);
                const avgSentimentScore = result[0].avgSentimentScore || 0;
                return parseFloat(avgSentimentScore.toFixed(2));
            }
            catch (error) {
                console.error('Error calculating average sentiment score:', error);
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    ;
    getAverageRatingByMenuItem(menuItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const [result] = yield connection.execute('SELECT AVG(rating) AS avgRating FROM Feedback WHERE menuItemId = ?', [menuItemId]);
                const avgRating = result[0].avgRating || 0;
                return parseFloat(avgRating.toFixed(2));
            }
            catch (error) {
                console.error('Error calculating average rating:', error);
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    ;
}
exports.FeedbackRepository = FeedbackRepository;
