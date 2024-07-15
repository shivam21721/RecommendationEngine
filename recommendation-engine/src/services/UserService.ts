import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    private userRepository: UserRepository;
    
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserRole(userId: number) {
        try {
            const role = await this.userRepository.getUserRole(userId);
            return role;
        } catch(error) {
            throw error;
        }
    }
}