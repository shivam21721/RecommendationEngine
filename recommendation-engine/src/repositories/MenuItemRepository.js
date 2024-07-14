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
                const query = 'SELECT * FROM MenuItem';
                const [result] = yield connection.execute(query);
                return result;
            }
            catch (error) {
                throw new Error("Error while fetching all menu items: " + error);
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
                const query = 'INSERT INTO MenuItem (name, categoryId, availability, price) VALUES (?, ?, ?, ?)';
                const values = [name, categoryId, availability, price];
                const [result] = yield connection.execute(query, values);
                return result.insertId;
            }
            catch (error) {
                throw new Error("Error while adding the menu item: " + error);
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
                const query = 'DELETE FROM MenuItem WHERE id = ?';
                const values = [id];
                const [result] = yield connection.execute(query, values);
                if (result.affectedRows > 0) {
                    return id;
                }
                else {
                    throw new Error('Item not found or already deleted');
                }
            }
            catch (error) {
                throw new Error("Error while deleting menu item: " + error);
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
                const query = 'UPDATE MenuItem SET name = ?, categoryId = ?, price = ?, availability = ? WHERE id = ?';
                const values = [name, categoryId, price, availability, id];
                const [result] = yield connection.execute(query, values);
                if (result.affectedRows > 0) {
                    return id;
                }
                else {
                    throw new Error('Item not found');
                }
            }
            catch (error) {
                throw new Error("Error while updating the menu item: " + error);
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
                ri.recommendationDate = CURDATE()
                GROUP BY 
                mi.id, mi.name, mc.name, mi.price, ri.mealType
                ORDER BY 
                mi.id;`;
                const [result] = yield connection.execute(query);
                return result;
            }
            catch (error) {
                throw new Error("Error while fetching Rolled out menu: " + error);
            }
            finally {
                connection.release();
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
                if (result.affectedRows > 0) {
                    return result.affectedRows;
                }
                else {
                    throw new Error("Failed to vote menu items, items not found");
                }
            }
            catch (error) {
                throw new Error("Error while updating voted Menu items: " + error);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.MenuItemRepository = MenuItemRepository;
