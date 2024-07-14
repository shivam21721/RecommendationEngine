import { NotificationRepository } from "../repositories/NotificationRepository";
import { UserService } from "./UserService";
import { Notification, Response } from "../interfaces/Interface";

export class NotificationService {
    private notificationRepository: NotificationRepository;
    private userService: UserService;

    constructor() {
        this.notificationRepository = new NotificationRepository();
        this.userService = new UserService();
    }

    async sendNotificationForRolledOutItems(): Promise<Response<[]>> {
        try {
            const date = (new Date()).toISOString().slice(0, 10);
            const message = `Chef has rolled out the menu items for ${date}. Please view and rolled out menu items and vote your favorites items`;
            const type = 2;
            const notificationId = await this.notificationRepository.addNotification({message, date, type});
            const response: Response<[]> = {
                status: 'success',
                message: 'Successfully sent the notification',
                data: []
            };
            return response;
        } catch(error) {
            throw error;
        }
    }

    async sendNotificationForFinalizedMenuItems(): Promise<Response<[]>> {
        try {
            const date = (new Date()).toISOString().slice(0, 10);
            const message = `Chef has sent the finalized menu items for ${date}, you can check the menu`;
            const type = 2;
            const notificationId = await this.notificationRepository.addNotification({message, date, type});
            const response: Response<[]> = {
                status: 'success',
                message: 'Successfully sent the notification',
                data: []
            };
            return response;
        } catch(error) {
            throw error;
        }
    }

    async getUserNotifications(userId: any): Promise<Response<Notification[]>> {
        try {
            const userRole = await this.userService.getUserRole(userId);
            const notifications = await this.notificationRepository.getUserNotifications(userRole);
            const response: Response<Notification[]> = {
                status: 'success',
                message: 'Successfully sent the notification',
                data: notifications as Notification[]
            };
            return response;
        } catch(error) {
            throw error;
        }
    }
}