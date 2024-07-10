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
exports.MenuItemRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class MenuItemRepository {
    constructor() {
        this.pool = db_1.default.getPool();
    }
    getAllMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const [rows] = yield connection.execute('SELECT * FROM MenuItem');
                return rows;
            }
            finally {
                connection.release();
            }
        });
    }
    addMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const { name, categoryId, availability, price } = itemData;
                const [result] = yield connection.execute('INSERT INTO MenuItem (name, categoryId, availability, price) VALUES (?, ?, ?, ?)', [name, categoryId, availability, price]);
                const insertId = result.insertId;
                return { id: insertId, name, categoryId, price, availability };
            }
            finally {
                connection.release();
            }
        });
    }
    deleteMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const [result] = yield connection.execute('DELETE FROM MenuItem WHERE id = ?', [id]);
                if (result.affectedRows > 0) {
                    return id;
                }
                else {
                    throw new Error('Item not found or already deleted');
                }
            }
            finally {
                connection.release();
            }
        });
    }
    updateMenuItem(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const { id, name, categoryId, availability, price } = itemData;
                const [result] = yield connection.execute('UPDATE MenuItem SET name = ?, categoryId = ?, price = ?, availability = ? WHERE id = ?', [name, categoryId, price, availability, id]);
                if (result.affectedRows > 0) {
                    return id;
                }
                else {
                    throw new Error('Item not found or already deleted');
                }
            }
            finally {
                connection.release();
            }
        });
    }
    fetchRolledOutMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const query = `SELECT 
                mi.id AS menuItemId,
                mi.name AS menuItemName,
                mc.name AS categoryName,
                mi.price AS menuItemPrice,
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
                ri.recommendationDate = CURDATE()
                GROUP BY 
                mi.id, mi.name, mc.name, mi.price
                ORDER BY 
                mi.id;`;
                const [result] = yield connection.execute(query);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateVotedMenuItems(itemIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const ids = itemIds.join(', ');
                const query = `
                UPDATE RecommendedItem
                SET voteCount = voteCount + 1
                WHERE recommendationDate = CURDATE()
                AND menuItemId IN (${ids});
            `;
                const [result] = yield connection.execute(query);
                console.log(result);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MenuItemRepository = MenuItemRepository;
