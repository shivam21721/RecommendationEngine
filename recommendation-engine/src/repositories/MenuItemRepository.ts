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

}

