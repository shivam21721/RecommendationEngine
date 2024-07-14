import { AuthService } from "../services/AuthService";
import { User } from "../../interfaces/Interface";
import { asyncUserInput } from "../readline";

const authService = new AuthService();

export async function login(): Promise<User | string> {
    try {
       const username = await asyncUserInput('Enter your username: ');
       const password = await asyncUserInput('Enter your password: ');
       const userData = await authService.login({username, password});
       return userData as User;
    } catch(error) {
        throw error;
    }
};

