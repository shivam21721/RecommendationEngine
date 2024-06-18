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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticationRepository = void 0;
const promise_1 = require("mysql2/promise");
class UserAuthenticationRepository {
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, promise_1.createConnection)({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'recommendation_engine'
            });
        });
    }
    getUserPassword(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getConnection();
            const [rows] = yield connection.execute('SELECT * FROM user_authentication WHERE user_id = ?', [userId]);
            yield connection.end();
            if (Array.isArray(rows) && rows.length > 0) {
                console.log(rows[0]);
                return rows[0];
            }
            return null;
        });
    }
}
exports.UserAuthenticationRepository = UserAuthenticationRepository;
