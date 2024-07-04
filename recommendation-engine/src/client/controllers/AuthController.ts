import { AuthService } from "../services/AuthService";
import { User } from "../../models/User";
import { asyncUserInput } from "../readline";
//import { rl } from "../client";

const authService = new AuthService();

export async function login(): Promise<User | string> {
    try {
       const username = await asyncUserInput('Enter your username: ');
       const password = await asyncUserInput('Enter your password: ');
       const userData = await authService.login({username, password});
       return userData as User;
    } catch(error) {
        return error as string;
    }
};

