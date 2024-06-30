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
    addMenuItem(name, categoryId, availability, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
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
                yield connection.execute('DELETE FROM MenuItem WHERE id = ?', [id]);
            }
            finally {
                connection.release();
            }
        });
    }
    updateMenuItem(id, name, categoryId, availability, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                yield connection.execute('UPDATE MenuItem SET name = ?, categoryId = ?, price = ?, availability = ? WHERE id = ?', [name, categoryId, price, availability, id]);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.MenuItemRepository = MenuItemRepository;
