import db from "../db/db";

export class RecommendationRepository {
    private pool = db.getPool();

    async getMenuForRecommendation() {
       const connection = await this.pool.getConnection() ;
       const query = `SELECT 
        m.id AS menuId, 
        m.name AS menuName, 
        c.name AS categoryName,
        ROUND(AVG(f.rating), 2) AS avgRating,
        ROUND(AVG(f.sentimentScore), 2) AS avgSentiment
        FROM MenuItem m
        JOIN MenuCategory c ON m.categoryId = c.id
        LEFT JOIN Feedback f ON m.id = f.menuItemId
        GROUP BY c.id, m.id
        ORDER BY c.name;`;

       try {
            const [rows] = await connection.execute(query);
            return rows;
       } catch (error) {
            console.error('Error while fetching the recommendation menu:', error);
            throw error;
       } finally {
        connection.release();
    }
    };

}