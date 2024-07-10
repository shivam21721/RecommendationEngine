import { MenuItem } from "../models/MenuItem";
import db from "../db/db";

export class NotificationRepository {
    private pool = db.getPool();

    async addNotification(notification: any) {
        const connection = await this.pool.getConnection();
        try {
            const {message, date, type} = notification;
            const query = 'INSERT INTO notification (Message, Date, NotificationTypeId) VALUES (?, ?, ?)';
            const [result] = await connection.execute(query, [message, date, type]);
        } catch(error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    async getUserNotifications(type: any) {
        const connection = await this.pool.getConnection();
        try {
             const query = `
             SELECT n.Message, n.Date
             FROM notification n
             JOIN NotificationType nt ON n.NotificationTypeId = nt.Id
             WHERE nt.Type = '${type}'
             ORDER BY n.Date DESC
            `;

            const [result] = await connection.execute(query);
            return result;
        } catch(error) {
            throw error;
        }
    }
}