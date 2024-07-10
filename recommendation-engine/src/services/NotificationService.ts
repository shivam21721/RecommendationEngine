import { NotificationRepository } from "../repositories/NotificationRepository";
import { UserService } from "./UserService";

export class NotificationService {
    private notificationRepository: NotificationRepository;
    private userService: UserService;

    constructor() {
        this.notificationRepository = new NotificationRepository();
        this.userService = new UserService();
    }

    async sendNotificationForRolledOutItems() {
        try {
            const date = (new Date()).toISOString().slice(0, 10);
            const message = `Chef has rolled out the menu items for ${date}. Please view and rolled out menu items and vote your favorites items`;
            const type = 2;

            await this.notificationRepository.addNotification({message, date, type});
        } catch(error) {
            throw error;
        }
    }

    async sendNotificationForFinalizedMenuItems() {
        try {
            const date = (new Date()).toISOString().slice(0, 10);
            const message = `Chef has sent the finalized menu items for ${date}, you can check the menu`;
            const type = 2;

            await this.notificationRepository.addNotification({message, date, type});
        } catch(error) {
            throw error;
        }
    }

    async getUserNotifications(userId: any) {
        try {
            const userRole = await this.userService.getUserRole(userId);
            const notifications = await this.notificationRepository.getUserNotifications(userRole);
            return notifications;
        } catch(error) {
            throw error;
        }
    }
}