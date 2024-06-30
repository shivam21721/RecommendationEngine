import mysql from 'mysql2/promise';

class Database {
    private static instance: Database;
    private pool: mysql.Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'recommendation_engine',
            waitForConnections: true,
            connectionLimit: 10, // Number of connections in the pool
            queueLimit: 0
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getPool(): mysql.Pool {
        return this.pool;
    }

    public async disconnect(): Promise<void> {
        await this.pool.end();
    }
}

const db = Database.getInstance();
export default db;
