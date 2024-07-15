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
    socket.on('getMenuItems', async (payload) => {
        const response = await menuItemController.getMenuItems(payload);
        socket.emit('getMenuItemsResponse', response);
    });

    socket.on('getNextDayMenuRecommendation', async () => {
        const response = await recommendationController.getNextDayMenuRecommendation();
        socket.emit('getNextDayMenuRecommendationResponse', response);
    });

    socket.on('rolloutItemsChoiceForNextDay', async (payload) => {
        const response = await recommendationController.rolloutItems(payload);
        socket.emit('rolloutItemsChoiceForNextDayResponse', response);
    });
 
    socket.on('getFinalMenuRecommendation', async (payload) => {
        const response = await recommendationController.fetchFinalMenuRecommendation(payload);
        socket.emit('getFinalMenuRecommendationResponse', response);
    });   

    socket.on('rolloutFinalizedItems', async (payload) => {
        const response = await recommendationController.rolloutFinalizedMenuItems(payload);
        socket.emit('rolloutFinalizedItemsResponse', response);
    });

    socket.on('fetchUserNotifications', async (payload) => {
        const response = await notificationController.getUserNotifications(payload);
        socket.emit('fetchUserNotificationsResponse', response);
    })
}