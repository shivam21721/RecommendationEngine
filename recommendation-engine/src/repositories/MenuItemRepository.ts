import { MenuItem } from "../models/MenuItem";
import db from "../db/db";

export class MenuItemRepository {
    private pool = db.getPool();

    async getAllMenuItems(): Promise<MenuItem[]> {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM MenuItem');
            return rows as MenuItem[];
        } finally {
            connection.release();
        }
    }

    async addMenuItem(itemData: any): Promise<MenuItem> {
        const connection = await this.pool.getConnection();
        try {
            const {name, categoryId, availability, price} = itemData;
            const [result] = await connection.execute('INSERT INTO MenuItem (name, categoryId, availability, price) VALUES (?, ?, ?, ?)', [name, categoryId, availability, price]);
            const insertId = (result as any).insertId;
            return { id: insertId, name, categoryId, price, availability };
        } finally {
            connection.release();
        }
        
    }

    async deleteMenuItem(id: number): Promise<number> {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.execute('DELETE FROM MenuItem WHERE id = ?', [id]);
            if ((result as any).affectedRows > 0) {
                return id; 
            } else {
                throw new Error('Item not found or already deleted');
            }
        } finally {
            connection.release();
        }
        
    }

    async updateMenuItem(itemData: any): Promise<number>  {
        const connection = await this.pool.getConnection();
        try {
            const {id, name, categoryId, availability, price} = itemData;
            const [result] = await connection.execute('UPDATE MenuItem SET name = ?, categoryId = ?, price = ?, availability = ? WHERE id = ?', [name, categoryId, price, availability, id]);
            if ((result as any).affectedRows > 0) {
                return id; 
            } else {
                throw new Error('Item not found or already deleted');
            }
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
                mi.id, mi.name, mc.name, mi.price
                ORDER BY 
                mi.id;`;
            const [result] = await connection.execute(query);
            return result;
        } catch(error) {
            throw error;
        }
    }

    async updateVotedMenuItems(itemIds: any) {
        const connection = await this.pool.getConnection();
        try {
            const ids = itemIds.join(', ');
            const query = `
                UPDATE RecommendedItem
                SET voteCount = voteCount + 1
                WHERE recommendationDate = CURDATE()
                AND menuItemId IN (${ids});
            `;
            const [result] = await connection.execute(query);
            console.log(result);
            return result;
        } catch(error) {
            throw error;
        }
    }

}

