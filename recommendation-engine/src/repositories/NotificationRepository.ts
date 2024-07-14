import db from "../db/db";
import { QueryResult } from "../interfaces/Interface";

export class NotificationRepository {
    private pool = db.getPool();

    async addNotification(notification: any): Promise<number> {
        const connection = await this.pool.getConnection();
        try {
            const {message, date, type} = notification;
            const query = 'INSERT INTO notification (Message, Date, NotificationTypeId) VALUES (?, ?, ?)';
            const values = [message, date, type];
            const [result] = await connection.execute(query, values);
            if((result as QueryResult).insertId) {
                return (result as QueryResult).insertId;
            } else {
                throw new Error("Failed to add the notification");
            }
        } catch(error) {
            throw new Error("Error while adding the notification: " + error);
        } finally {
            connection.release();
        }
    };

    async getUserNotifications(type: any) {
        const connection = await this.pool.getConnection();
        try {
             const query = `
             SELECT n.Message as message, n.Date as date
             FROM notification n
             JOIN NotificationType nt ON n.NotificationTypeId = nt.Id
             WHERE nt.Type = '${type}'
             ORDER BY n.Date DESC
            `;
            const [result] = await connection.execute(query);
            return result;
        } catch(error) {
            throw new Error("Error while fetching notificaitons: " + error);
        } finally {
            connection.release();
        }
    };
}