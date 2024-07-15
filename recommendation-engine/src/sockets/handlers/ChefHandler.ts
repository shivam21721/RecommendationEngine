import { Socket } from "socket.io";
import { MenuItemController } from "../../controllers/MenuItemController";
import { NotificationController } from "../../controllers/NotificationController";
import { RecommendationController } from "../../controllers/RecommendationController";
import { RecommendationService } from "../../services/RecommendationService";
import { Payload, SelectedMenuItems } from "../../interfaces/Interface";

const menuItemController = new MenuItemController();
const recommendationController = new RecommendationController();
const notificationController = new NotificationController();

export function handleChef(socket: Socket, user: any) {
    socket.on('getMenuItems', async () => {
        const response = await menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', response);
    });

    socket.on('getNextDayMenuRecommendation', async () => {
        const response = await recommendationController.getNextDayMenuRecommendation();
        socket.emit('getNextDayMenuRecommendationResponse', response);
    });

    socket.on('rolloutItemsChoiceForNextDay', async (items: any) => {
        const response = await recommendationController.rolloutItems(items);
        socket.emit('rolloutItemsChoiceForNextDayResponse', response);
    });
 
    socket.on('getFinalMenuRecommendation', async () => {
        const response = await recommendationController.fetchFinalMenuRecommendation();
        socket.emit('getFinalMenuRecommendationResponse', response);
    });   

    socket.on('rolloutFinalizedItems', async (items: Payload<SelectedMenuItems>) => {
        const response = await recommendationController.rolloutFinalizedMenuItems(items);
        socket.emit('rolloutFinalizedItemsResponse', response);
    });

    socket.on('fetchUserNotifications', async (userId) => {
        const response = await notificationController.getUserNotifications(userId);
        socket.emit('fetchUserNotificationsResponse', response);
    })
}