import { createConnection } from "mysql2/promise";
import { User } from "../models/User";

export class UserRepository {
    private async getConnection() {
        return createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'recommendation_engine'
        });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const connection = await this.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [username]);
        await connection.end();

        if(Array.isArray(rows) && rows.length) {
            return rows[0] as User;
        }
        return null;
    }
}

