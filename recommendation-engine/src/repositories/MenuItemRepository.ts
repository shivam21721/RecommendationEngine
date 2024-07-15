import db from "../db/db";
import { MenuItem, QueryResult } from "../interfaces/Interface";

export class MenuItemRepository {
    private pool = db.getPool();

    async getAllMenuItems(): Promise<MenuItem[]> {
        const connection = await this.pool.getConnection();
        try {
            const query = 'SELECT * FROM MenuItem';
            const [result] = await connection.execute(query);
            return result as MenuItem[];
        } catch(error) {
            throw new Error("Error while fetching all menu items: " + error);
        } finally {
            connection.release();
        }
    }

    async addMenuItem(itemData: any): Promise<number> {
        const connection = await this.pool.getConnection();
        try {
            const {name, categoryId, availability, price} = itemData;
            const query = 'INSERT INTO MenuItem (name, categoryId, availability, price) VALUES (?, ?, ?, ?)';
            const values = [name, categoryId, availability, price];
            const [result] = await connection.execute(query, values);
            return (result as QueryResult).insertId ;
        } catch(error) {
            throw new Error("Error while adding the menu item: " + error);
        } finally {
            connection.release();
        }
    }

    async deleteMenuItem(id: number): Promise<number> {
        const connection = await this.pool.getConnection();
        try {
            const query = 'DELETE FROM MenuItem WHERE id = ?';
            const values = [id];
            const [result] = await connection.execute(query, values);
            if ((result as QueryResult).affectedRows > 0) {
                return id; 
            } else {
                throw new Error('Item not found or already deleted');
            }
        } catch(error) {
            throw new Error("Error while deleting menu item: " + error);
        } finally {
            connection.release();
        }
    }

    async updateMenuItem(itemData: any): Promise<number>  {
        const connection = await this.pool.getConnection();
        try {
            const {id, name, categoryId, availability, price} = itemData;
            const query = 'UPDATE MenuItem SET name = ?, categoryId = ?, price = ?, availability = ? WHERE id = ?';
            const values = [name, categoryId, price, availability, id];
            const [result] = await connection.execute(query, values);
            if ((result as QueryResult).affectedRows > 0) {
                return id; 
            } else {
                throw new Error('Item not found');
            }
        } catch(error) {
            throw new Error("Error while updating the menu item: " + error);
        } finally {
            connection.release();
        }
    }

    async fetchRolledOutMenu() {
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
                ri.recommendationDate = CURDATE()
                GROUP BY 
                mi.id, mi.name, mc.name, mi.price, ri.mealType
                ORDER BY 
                mi.id;`;
            const [result] = await connection.execute(query);
            return result;
        } catch(error) {
            throw new Error("Error while fetching Rolled out menu: " + error);
        } finally {
            connection.release();
        }
    }

    async updateVotedMenuItems(items: any): Promise<number> {
        const connection = await this.pool.getConnection();
        try {
            const conditions = items.map((item: any) => `(menuItemId = ${item.id} AND mealType = '${item.mealType}')`).join(' OR ');
            const query = `
                UPDATE RecommendedItem
                SET voteCount = voteCount + 1
                WHERE (${conditions})
                AND recommendationDate = CURDATE()
            `;
            const [result] = await connection.execute(query);
            if((result as QueryResult).affectedRows > 0) {
                return (result as QueryResult).affectedRows;
            } else {
                throw new Error("Failed to vote menu items, items not found");
            }
        } catch(error) {
            throw new Error("Error while updating voted Menu items: " + error);
        } finally {
            connection.release();
        }
    }

}

