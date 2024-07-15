import { UserService } from "../services/UserService";
const userService = new UserService();

export async function isAuthorizedUser(userId:number, requiredRoles: string[]) {
    const userRole = await userService.getUserRole(userId);
    return requiredRoles.includes(userRole);
}