import { NotificationService } from "../services/NotificationService";
import { Response, Notification } from "../interfaces/Interface";

export class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    async getUserNotifications(userId: any): Promise<Response<Notification[] | []>> {
        try {
            const response = await this.notificationService.getUserNotifications(userId);
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }
}