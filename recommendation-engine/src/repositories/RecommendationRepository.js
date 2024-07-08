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
                // Assuming items is an array of objects like [{ date: '2024-07-08', id: 1 }, { date: '2024-07-09', id: 2 }, ...]
                // Create an array of placeholders like (?, ?), (?, ?), ...
                const placeholders = items.map(() => '(?, ?)').join(', ');
                // Construct the SQL query with placeholders
                const query = `
                   INSERT INTO RecommendedItem (recommendationDate, menuItemId)
                   VALUES ${placeholders}
               `;
                // Flatten the values array to match the placeholders
                const values = items.flatMap((item) => [item.date, item.id]);
                console.log(values); // Debugging to see the flattened values
                // Execute the query with the flattened values array
                const [rows] = yield connection.execute(query, values);
                return rows;
                console.log('Bulk insert successful', rows);
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
               mi.id, mi.name, mc.name, ri.voteCount
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
}
exports.RecommendationRepository = RecommendationRepository;
