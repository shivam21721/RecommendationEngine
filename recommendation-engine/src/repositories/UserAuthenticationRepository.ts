import { UserAuthentication } from "../interfaces/Interface";
import db from "../db/db";

export class UserAuthenticationRepository {
    private pool = db.getPool();
    
    async getUserPassword(userId: number): Promise<UserAuthentication> {
        const connection = await this.pool.getConnection();
        try {
            const query = 'SELECT * FROM userAuthentication WHERE userId = ?';
            const values = [userId];
            const [result] = await connection.execute(query, values);
            if(Array.isArray(result) && result.length > 0) {
                return result[0] as UserAuthentication;
            }
            else {
                throw new Error('User not found');
            }
        } catch(error) {
            throw new Error("Error while Authenticaiton: " + error);
        } finally {
            connection.release();
        }
    }
}