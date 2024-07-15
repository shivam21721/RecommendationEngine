import { NotificationService } from "../services/NotificationService";
import { Response, Notification, Payload } from "../interfaces/Interface";
import { UserRole } from "../enums/UserRoles";
import { isAuthorizedUser } from "../utils/Authorization";

export class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    async getUserNotifications(payload: Payload<null>): Promise<Response<Notification[] | []>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Chef, UserRole.Employee])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.notificationService.getUserNotifications(payload.userId);
            return response;
        } catch(error) {
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