import { UserAuthenticationService } from "../services/UserAuthenticationService";
import { User } from "../models/User";
export class UserAuthenticationController {
    private userAuthenticationService: UserAuthenticationService;

    constructor() {
        this.userAuthenticationService = new UserAuthenticationService();
    }

    async login(username: string, password: string): Promise<User | undefined> {
        try {
            const user = await this.userAuthenticationService.login(username, password);
            return user;
        } catch (error ) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
}