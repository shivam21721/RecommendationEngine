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
               ROUND(AVG(f.sentimentScore), 2) AS avgSentiment,
               COALESCE(ri.preparedCount, 0) AS preparedCount
          FROM MenuItem m
          JOIN MenuCategory c ON m.categoryId = c.id
          LEFT JOIN Feedback f ON m.id = f.menuItemId
          LEFT JOIN (
               SELECT MenuItemId, COUNT(*) AS preparedCount
               FROM RecommendedItem
               WHERE isPrepared = TRUE
               GROUP BY menuItemId
          ) ri ON m.id = ri.menuItemId
          GROUP BY c.id, m.id
          ORDER BY c.name`;
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
    addRecommendedItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const placeholders = items.map(() => '(?, ?, ?)').join(', ');
                const query = `
                   INSERT INTO RecommendedItem (recommendationDate, menuItemId, mealType)
                   VALUES ${placeholders}
               `;
                const values = items.flatMap((item) => [item.date, item.id, item.mealType]);
                console.log('values', values);
                const [rows] = yield connection.execute(query, values);
                return rows;
            }
            catch (error) {
                console.log('Error while inserting record', error.message);
            }
        });
    }
    fetchFinalMenuRecommendation() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            const query = `SELECT 
          mi.id AS menuItemId,
          mi.name AS menuItemName,
          mc.name AS categoryName,
          ri.voteCount,
          ri.mealType,
          AVG(f.rating) AS avgRating,
          AVG(f.sentimentScore) AS avgSentiment,
          (
               SELECT COUNT(*)
               FROM recommendeditem ri_sub
               WHERE ri_sub.menuItemId = ri.menuItemId
               AND ri_sub.isPrepared = 1
               AND ri_sub.recommendationDate != CURRENT_DATE()
                    ) AS preparedCount
          FROM 
               recommendeditem ri
          JOIN 
               menuitem mi ON ri.menuItemId = mi.id
          JOIN 
               menucategory mc ON mi.categoryId = mc.id
          LEFT JOIN 
               feedback f ON mi.id = f.menuItemId
          WHERE 
               ri.recommendationDate = CURRENT_DATE()
          GROUP BY 
               mi.id, mi.name, mc.name, ri.voteCount, ri.mealType
          ORDER BY 
               mi.id;`;
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
    markItemAsPrepared(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const placeholders = itemIds.map((id) => id).join(', ');
                const query = `
            UPDATE recommendeditem
            SET isPrepared = 1
            WHERE menuItemId IN (${placeholders}) AND recommendationDate = CURDATE()
          `;
                const [result] = yield connection.execute(query);
            }
            catch (error) {
                console.error("Error while updating prepared items");
                throw error;
            }
        });
    }
    getPreparedMenuForToday() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const query = `SELECT 
          mi.id AS menuItemId,
          mi.name AS menuItemName,
          mc.name AS categoryName,
          mi.price AS menuItemPrice,
          ri.mealType,
          AVG(f.rating) AS averageRating,
          AVG(f.sentimentScore) AS averageSentimentScore
          FROM 
          recommendeditem ri
          JOIN 
          menuitem mi ON ri.menuItemId = mi.id
          JOIN 
          menucategory mc ON mi.categoryId = mc.id
          LEFT JOIN 
          feedback f ON mi.id = f.menuItemId
          WHERE 
          ri.isPrepared = 1
          AND ri.recommendationDate = CURDATE() - INTERVAL 1 DAY
          GROUP BY 
          mi.id, mi.name, mc.name, mi.price, ri.mealType
          ORDER BY 
          mi.id;`;
                const [result] = yield connection.execute(query);
                return result;
            }
            catch (error) {
                console.log("Error while fetching the today menu");
                throw error;
            }
        });
    }
    getNextDayFinalizedMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            const query = `SELECT 
          mi.id AS menuItemId,
          mi.name AS menuItemName,
          mc.name AS categoryName,
          mi.price AS menuItemPrice,
          ri.mealType,
          AVG(f.rating) AS averageRating,
          AVG(f.sentimentScore) AS averageSentimentScore
          FROM 
          recommendeditem ri
          JOIN 
          menuitem mi ON ri.menuItemId = mi.id
          JOIN 
          menucategory mc ON mi.categoryId = mc.id
          LEFT JOIN 
          feedback f ON mi.id = f.menuItemId
          WHERE 
          ri.isPrepared = 1
          AND ri.recommendationDate = CURDATE() 
          GROUP BY 
          mi.id, mi.name, mc.name, mi.price, ri.mealType
          ORDER BY 
          mi.id;`;
            try {
                const [results] = yield connection.execute(query);
                return results;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
}
exports.RecommendationRepository = RecommendationRepository;
