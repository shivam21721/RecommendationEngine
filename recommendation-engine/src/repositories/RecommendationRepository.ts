import db from "../db/db";
import { QueryResult } from "../interfaces/Interface";

export class RecommendationRepository {
    private pool = db.getPool();

    async getMenuForRecommendation() {
          const connection = await this.pool.getConnection() ;
          try {
               const query = `SELECT 
               m.id AS menuId, 
               m.name AS menuName, 
               c.name AS categoryName,
               ROUND(AVG(f.rating), 2) AS avgRating,
               ROUND(AVG(f.sentimentScore), 2) AS avgSentiment,
               COALESCE(ri.preparedCount, 0) AS preparedCount
               FROM MenuItem m
               JOIN MenuCategory c ON m.categoryId = c.id
               LEFT JOIN Feedback f ON m.id = f.menuItemId
               LEFT JOIN (
                    SELECT MenuItemId, COUNT(*) AS preparedCount
                    FROM RecommendedItem
                    WHERE isPrepared = TRUE
                    GROUP BY menuItemId
               ) ri ON m.id = ri.menuItemId
               where m.availability = TRUE
               GROUP BY c.id, m.id
               ORDER BY c.name`;
               const [result] = await connection.execute(query);
               return result;
          } catch (error) {
               throw new Error("Error while fetching the menu for recommendation");
          } finally {
               connection.release();
          }
    };

    async addRecommendedItems(items: any) {
          const connection = await this.pool.getConnection();
          try {
               const placeholders = items.map(() => '(?, ?, ?)').join(', ');
               const query = `
                   INSERT INTO RecommendedItem (recommendationDate, menuItemId, mealType)
                   VALUES ${placeholders}
               `;
               const values = items.flatMap((item: any) => [item.date, item.id, item.mealType]);
               const [result] = await connection.execute(query, values);

               if((result as QueryResult).affectedRows > 0) {
                    return (result as QueryResult).affectedRows;
               } else {
                    throw new Error("Failed to insert the recommended items.");
               }
          } catch (error) {
               throw new Error("Error while inserting the recommended Item: " + error);
          } finally {
               connection.release();
          }
    };

    async fetchFinalMenuRecommendation() {
          const connection = await this.pool.getConnection() ;
          try {
               const query = `SELECT 
               mi.id AS menuItemId,
               mi.name AS menuItemName,
               mc.name AS categoryName,
               ri.voteCount,
               ri.mealType,
               AVG(f.rating) AS avgRating,
               AVG(f.sentimentScore) AS avgSentiment,
               (
                    SELECT COUNT(*)
                    FROM recommendeditem ri_sub
                    WHERE ri_sub.menuItemId = ri.menuItemId
                    AND ri_sub.isPrepared = 1
                    AND ri_sub.recommendationDate != CURRENT_DATE()
                         ) AS preparedCount
               FROM 
                    recommendeditem ri
               JOIN 
                    menuitem mi ON ri.menuItemId = mi.id
               JOIN 
                    menucategory mc ON mi.categoryId = mc.id
               LEFT JOIN 
                    feedback f ON mi.id = f.menuItemId
               WHERE 
                    ri.recommendationDate = CURRENT_DATE()
               GROUP BY 
                    mi.id, mi.name, mc.name, ri.voteCount, ri.mealType
               ORDER BY 
                    mi.id;`;
               const [result] = await connection.execute(query);
               return result;
          } catch (error) {
               throw new Error("Error while fetching final menu recommendations: " + error);
          } finally {
               connection.release();
          }
    };

    async markItemAsPrepared(items: any) {
          const connection = await this.pool.getConnection();
          try {
               const conditions = items.map((item: any) => `(menuItemId = ${item.id} AND mealType = '${item.mealType}')`).join(' OR ');
               const query = `
                    UPDATE RecommendedItem
                    SET isPrepared = TRUE
                    WHERE (${conditions})
                    AND recommendationDate = CURDATE()
               `;
               const [result] = await connection.execute(query);
               if((result as QueryResult).affectedRows > 0) {
                    return (result as QueryResult).affectedRows;
               } else {
                    throw new Error("Failed to mark the items as prepared");
               }
          } catch(error) {
               throw new Error("Error while marking items as prepared: " + error);
          } finally {
               connection.release();
          }
    }

    async getPreparedMenuForToday() {
          const connection = await this.pool.getConnection();
          try {
               const query = `SELECT 
               mi.id AS menuItemId,
               mi.name AS menuItemName,
               mc.name AS categoryName,
               mi.price AS menuItemPrice,
               ri.mealType,
               AVG(f.rating) AS averageRating,
               AVG(f.sentimentScore) AS averageSentimentScore
               FROM 
               recommendeditem ri
               JOIN 
               menuitem mi ON ri.menuItemId = mi.id
               JOIN 
               menucategory mc ON mi.categoryId = mc.id
               LEFT JOIN 
               feedback f ON mi.id = f.menuItemId
               WHERE 
               ri.isPrepared = 1
               AND ri.recommendationDate = CURDATE() - INTERVAL 1 DAY
               GROUP BY 
               mi.id, mi.name, mc.name, mi.price, ri.mealType
               ORDER BY 
               mi.id;`;
               const [result] = await connection.execute(query);
               return result;
          } catch(error) {
               throw new Error("Error while fetching prepared Menu: " + error);
          } finally {
               connection.release();
          }
    } 

    async getNextDayFinalizedMenu() {
          const connection = await this.pool.getConnection();
          try {
               const query = `SELECT 
               mi.id AS menuItemId,
               mi.name AS menuItemName,
               mc.name AS categoryName,
               mi.price AS menuItemPrice,
               ri.mealType,
               AVG(f.rating) AS averageRating,
               AVG(f.sentimentScore) AS averageSentimentScore
               FROM 
               recommendeditem ri
               JOIN 
               menuitem mi ON ri.menuItemId = mi.id
               JOIN 
               menucategory mc ON mi.categoryId = mc.id
               LEFT JOIN 
               feedback f ON mi.id = f.menuItemId
               WHERE 
               ri.isPrepared = 1
               AND ri.recommendationDate = CURDATE() 
               GROUP BY 
               mi.id, mi.name, mc.name, mi.price, ri.mealType
               ORDER BY 
               mi.id;`;
               const [result] = await connection.execute(query);
               return result;
          } catch(error) {
               throw new Error("Error while fetching next day final menu: " + error);
          } finally {
               connection.release();
          }
    };
}