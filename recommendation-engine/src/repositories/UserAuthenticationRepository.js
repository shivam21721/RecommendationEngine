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
exports.UserAuthenticationRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class UserAuthenticationRepository {
    constructor() {
        this.pool = db_1.default.getPool();
    }
    getUserPassword(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const query = 'SELECT * FROM userAuthentication WHERE userId = ?';
                const values = [userId];
                const [result] = yield connection.execute(query, values);
                if (Array.isArray(result) && result.length > 0) {
                    return result[0];
                }
                else {
                    throw new Error('User not found');
                }
            }
            catch (error) {
                throw new Error("Error while Authenticaiton: " + error);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.UserAuthenticationRepository = UserAuthenticationRepository;
