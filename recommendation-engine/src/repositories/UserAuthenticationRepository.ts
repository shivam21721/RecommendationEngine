import { createConnection } from "mysql2/promise";
import { UserAuthentication } from "../models/UserAuthentication";
import db from "../db/db";

export class UserAuthenticationRepository {
    private pool = db.getPool();
    
    async getUserPassword(userId: number): Promise<UserAuthentication | null> {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute('SELECT * FROM userAuthentication WHERE userId = ?', [userId]);
            
            if (Array.isArray(rows) && rows.length > 0) {
                return rows[0] as UserAuthentication;
            }
            
            return null;
        } finally {
            connection.release();
        }
    }
}