import { UserAuthenticationService } from "../services/UserAuthenticationService";
import { Response } from "../interfaces/Interface";

export class UserAuthenticationController {
    private userAuthenticationService: UserAuthenticationService;

    constructor() {
        this.userAuthenticationService = new UserAuthenticationService();
    }

    async login(username: string, password: string): Promise<Response<any | []>> {
        try {
            const response = await this.userAuthenticationService.login(username, password);
            return response;
        } catch (error ) {
            console.error((error as Error).message);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }
}