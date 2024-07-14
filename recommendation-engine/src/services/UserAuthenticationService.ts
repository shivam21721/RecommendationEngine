import { UserAuthenticationRepository } from "../repositories/UserAuthenticationRepository";
import { UserRepository } from "../repositories/UserRepository";
import { User, UserAuthentication, Response } from "../interfaces/Interface";

export class UserAuthenticationService {
    private userAuthenticationRepository: UserAuthenticationRepository;
    private userRepository: UserRepository;

    constructor() {
        this.userAuthenticationRepository = new UserAuthenticationRepository();
        this.userRepository = new UserRepository;
    }

    async login(username: string, password: string): Promise<Response<any>>{
        try {
            const user = await this.userRepository.findUserByUsername(username);
            if(!user) {
                throw new Error('User do not Exist');
            }
            const userCredentials = await this.userAuthenticationRepository.getUserPassword(user.id);
            if(userCredentials?.password !== password) {
                throw new Error('Invalid username or password');
            }
            const response: Response<any> = {
                status: 'success',
                message: 'User Successfully Authenticated',
                data: user
            };
            return response;
        } catch(error) {
            throw error;
        }
    }
}