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
                const query = `
                SELECT u.id, u.name, u.email, r.roleName AS role
                FROM user u
                JOIN role r ON u.roleId = r.id
                WHERE u.email = ?
            `;
                const values = [username];
                const [result] = yield connection.execute(query, values);
                if (Array.isArray(result) && result.length) {
                    return result[0];
                }
                else {
                    throw new Error("No user found");
                }
            }
            catch (error) {
                throw new Error("Error while fething user: " + error);
            }
            finally {
                connection.release();
            }
        });
    }
    getUserRole(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const query = `Select roleName from role where id = ${userId}`;
                const [result] = yield connection.execute(query);
                return result[0].roleName;
            }
            catch (error) {
                throw new Error('Error while fetching the user role: ' + error);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.UserRepository = UserRepository;
