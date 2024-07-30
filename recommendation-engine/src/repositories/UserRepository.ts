import { User, UserMenuItemPreference } from "../interfaces/Interface";
import db from "../db/db";

export class UserRepository {
    private pool = db.getPool();

    async findUserByUsername(username: string): Promise<User | null> {
        const connection = await this.pool.getConnection();
        try {
            const query = `
                SELECT u.id, u.name, u.email, r.roleName AS role
                FROM user u
                JOIN role r ON u.roleId = r.id
                WHERE u.email = ?
            `;
            const values = [username];
            const [result] = await connection.execute(query, values);

            if(Array.isArray(result) && result.length) {
                return result[0] as User;
            } else {
                throw new Error("No user found");
            }
        } catch(error) {
            throw new Error("Error while fething user: " + error);
        } finally {
            connection.release();
        }
    }

    async getUserRole(userId: number) {
        const connection = await this.pool.getConnection();
        try {
            const query = `Select roleName from role where id = ${userId}`;
            const [result] = await connection.execute(query);
            return (result as any)[0].roleName;
        } catch(error) {
            throw new Error('Error while fetching the user role: ' + error);
        } finally {
            connection.release();
        }
    }
    
    async getUserMenuItemPreferences(userId: number) {
        const connection = await this.pool.getConnection();
        try {
            const query = `
                SELECT preferredSpicyLevel, preferredDietType, preferredCuisineType
                FROM user
                WHERE id = ?
            `;
            const values = [userId];
            const [result] = await connection.execute(query, values);
            console.log(result);
            return (result as any)[0];
        } catch(error) {
            throw new Error("Error while fetching user menu item preferences: " + error);
        } finally {
            connection.release();
        }
    }

}

