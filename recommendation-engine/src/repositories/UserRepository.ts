import { User } from "../models/User";
import db from "../db/db";

export class UserRepository {
    private pool = db.getPool();

    async findUserByUsername(username: string): Promise<User | null> {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(`
                SELECT u.id, u.name, u.email, r.roleName AS role
                FROM user u
                JOIN role r ON u.roleId = r.id
                WHERE u.email = ?
            `, [username]);

            if(Array.isArray(rows) && rows.length) {
                return rows[0] as User;
            }
            return null;
        } finally {
            connection.release();
        }
    }

    async getUserRole(userId: any) {
        const connection = await this.pool.getConnection();
        try {
            const query = `Select roleName from role where id = ${userId}`;
            const [result] = await connection.execute(query);
            console.log('result:', result);
            return (result as any)[0].roleName;
        } catch(error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

