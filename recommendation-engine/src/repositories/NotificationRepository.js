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
exports.NotificationRepository = void 0;
const db_1 = __importDefault(require("../db/db"));
class NotificationRepository {
    constructor() {
        this.pool = db_1.default.getPool();
    }
    addNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const { message, date, type } = notification;
                const query = 'INSERT INTO notification (Message, Date, NotificationTypeId) VALUES (?, ?, ?)';
                const values = [message, date, type];
                const [result] = yield connection.execute(query, values);
                if (result.insertId) {
                    return result.insertId;
                }
                else {
                    throw new Error("Failed to add the notification");
                }
            }
            catch (error) {
                throw new Error("Error while adding the notification: " + error);
            }
            finally {
                connection.release();
            }
        });
    }
    ;
    getUserNotifications(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.pool.getConnection();
            try {
                const query = `
             SELECT n.Message as message, n.Date as date
             FROM notification n
             JOIN NotificationType nt ON n.NotificationTypeId = nt.Id
             WHERE nt.Type = '${type}'
             ORDER BY n.Date DESC
            `;
                const [result] = yield connection.execute(query);
                return result;
            }
            catch (error) {
                throw new Error("Error while fetching notificaitons: " + error);
            }
            finally {
                connection.release();
            }
        });
    }
    ;
}
exports.NotificationRepository = NotificationRepository;
