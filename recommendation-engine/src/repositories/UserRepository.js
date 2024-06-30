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
exports.UserRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class UserRepository {
    constructor() {
        this.pool = db_1.default.getPool();
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const [rows] = yield connection.execute(`
                SELECT u.id, u.name, u.email, r.roleName AS role
                FROM user u
                JOIN role r ON u.roleId = r.id
                WHERE u.email = ?
            `, [username]);
                if (Array.isArray(rows) && rows.length) {
                    return rows[0];
                }
                return null;
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.UserRepository = UserRepository;
