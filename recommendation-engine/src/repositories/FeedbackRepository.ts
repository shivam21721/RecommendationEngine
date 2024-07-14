import db from "../db/db";
import { QueryResult } from "../interfaces/Interface";

export class FeedbackRepository {
    private pool = db.getPool();

    async addFeedback(feedback: any): Promise<number> {
        const connection = await this.pool.getConnection();
        const { userId, menuItemId, comment, rating, feedbackDate, sentimentScore } = feedback;
        try {
            const query = 'INSERT INTO Feedback (userId, menuItemId, comment, rating, sentimentScore, feedbackDate) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [userId, menuItemId, comment, rating, sentimentScore, feedbackDate];
            const [result] = await connection.execute(query, values);
            return (result as QueryResult).insertId; 
        } catch (error) {
            throw new Error("Error while adding the feedback: " + error);
        } finally {
            connection.release();
        }
    };

    async getAllFeedbackByMenuItem(menuItemId: number) {
        const connection = await this.pool.getConnection();
        try {
            const query = 'SELECT * FROM Feedback WHERE menuItemId = ?';
            const values = [menuItemId];
            const [result] = await connection.execute(query, values);
            return result;
        } catch (error) {
            throw new Error('Error while fetching the Feedbacks: ' + error);
        } finally {
            connection.release();
        }
    };
}