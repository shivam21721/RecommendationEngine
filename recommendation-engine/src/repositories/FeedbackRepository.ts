import db from "../db/db";

export class FeedbackRepository {
    private pool = db.getPool();

    async addFeedback(feedback: any) {
        const connection = await this.pool.getConnection();
        const { userId, menuItemId, comment, rating, feedbackDate, sentimentScore } = feedback;
        console.log(userId, menuItemId, comment, rating, feedbackDate, sentimentScore);
        try {
            const [result] = await connection.execute(
                'INSERT INTO Feedback (userId, menuItemId, comment, rating, sentimentScore, feedbackDate) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, menuItemId, comment, rating, sentimentScore, feedbackDate]
            );
            return (result as any).insertId; 
        } catch (error) {
            console.error('Error adding feedback:', error);
            throw error;
        } finally {
            connection.release();
        }

    };

    async getAllFeedbackByMenuItem(menuItemId: number) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM Feedback WHERE menuItemId = ?',
                [menuItemId]
            );
            return rows;
        } catch (error) {
            console.error('Error fetching feedback:', error);
            throw error;
        } finally {
            connection.release();
        }
    };

    async getAverageSentimentScoreByMenuItem(menuItemId: number) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.execute(
                'SELECT AVG(sentimentScore) AS avgSentimentScore FROM Feedback WHERE menuItemId = ?',
                [menuItemId]
            );
            const avgSentimentScore = (result as any)[0].avgSentimentScore || 0; 
            return parseFloat(avgSentimentScore.toFixed(2)); 
        } catch (error) {
            console.error('Error calculating average sentiment score:', error);
            throw error;
        } finally {
            connection.release();
        }
    };

    async getAverageRatingByMenuItem(menuItemId: number) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.execute(
                'SELECT AVG(rating) AS avgRating FROM Feedback WHERE menuItemId = ?',
                [menuItemId]
            );
            const avgRating = (result as any)[0].avgRating || 0; 
            return parseFloat(avgRating.toFixed(2)); 
        } catch (error) {
            console.error('Error calculating average rating:', error);
            throw error;
        } finally {
            connection.release();
        }
    };
}