import { createConnection } from "mysql2/promise";
import { UserAuthentication } from "../models/UserAuthentication";

export class UserAuthenticationRepository {
    private async getConnection() {
        return createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'recommendation_engine'
        });
    }

    async getUserPassword(userId: number): Promise<UserAuthentication | null> {
        const connection = await this.getConnection();
        const [rows] = await connection.execute('SELECT * FROM user_authentication WHERE user_id = ?', [userId]);
        await connection.end();

        if (Array.isArray(rows) && rows.length > 0) {
            console.log(rows[0]);
            return rows[0] as UserAuthentication;
        }
        
        return null;
    }
}