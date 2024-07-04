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
exports.RecommendationRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class RecommendationRepository {
    constructor() {
        this.pool = db_1.default.getPool();
    }
    getMenuForRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            const query = `SELECT 
        m.id AS menuId, 
        m.name AS menuName, 
        c.name AS categoryName,
        ROUND(AVG(f.rating), 2) AS avgRating,
        ROUND(AVG(f.sentimentScore), 2) AS avgSentiment
        FROM MenuItem m
        JOIN MenuCategory c ON m.categoryId = c.id
        LEFT JOIN Feedback f ON m.id = f.menuItemId
        GROUP BY c.id, m.id
        ORDER BY c.name;`;
            try {
                const [rows] = yield connection.execute(query);
                return rows;
            }
            catch (error) {
                console.error('Error while fetching the recommendation menu:', error);
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    ;
}
exports.RecommendationRepository = RecommendationRepository;
