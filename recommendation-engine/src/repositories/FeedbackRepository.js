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
            const { userId, menuItemId, comment, rating, feedbackDate, sentimentScore } = feedback;
            try {
                const query = 'INSERT INTO Feedback (userId, menuItemId, comment, rating, sentimentScore, feedbackDate) VALUES (?, ?, ?, ?, ?, ?)';
                const values = [userId, menuItemId, comment, rating, sentimentScore, feedbackDate];
                const [result] = yield connection.execute(query, values);
                return result.insertId;
            }
            catch (error) {
                throw new Error("Error while adding the feedback: " + error);
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
                const query = 'SELECT * FROM Feedback WHERE menuItemId = ?';
                const values = [menuItemId];
                const [result] = yield connection.execute(query, values);
                return result;
            }
            catch (error) {
                throw new Error('Error while fetching the Feedbacks: ' + error);
            }
            finally {
                connection.release();
            }
        });
    }
    ;
}
exports.FeedbackRepository = FeedbackRepository;
