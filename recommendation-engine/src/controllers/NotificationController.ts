import { NotificationService } from "../services/NotificationService";

export class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    async getUserNotifications(userId: any) {
        try {
            const notifications = await this.notificationService.getUserNotifications(userId);
            return notifications;
        } catch(error) {
            console.log(error);
        }
    }
}