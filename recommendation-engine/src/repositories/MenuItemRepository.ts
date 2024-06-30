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

    async addMenuItem(name: string, categoryId: number,  availability: boolean, price: number): Promise<MenuItem> {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.execute('INSERT INTO MenuItem (name, categoryId, availability, price) VALUES (?, ?, ?, ?)', [name, categoryId, availability, price]);
            const insertId = (result as any).insertId;
            return { id: insertId, name, categoryId, price, availability };
        } finally {
            connection.release();
        }
        
    }

    async deleteMenuItem(id: number): Promise<void> {
        const connection = await this.pool.getConnection();
        try {
            await connection.execute('DELETE FROM MenuItem WHERE id = ?', [id]);
        } finally {
            connection.release();
        }
        
    }

    async updateMenuItem(id: number, name: string, categoryId: number,  availability: boolean, price: number): Promise<void>  {
        const connection = await this.pool.getConnection();
        try {
            await connection.execute('UPDATE MenuItem SET name = ?, categoryId = ?, price = ?, availability = ? WHERE id = ?', [name, categoryId, price, availability, id]);
        } finally {
            connection.release();
        }
        
    }

}

