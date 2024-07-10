import { Socket } from "socket.io";
import { MenuItemController } from "../../controllers/MenuItemController";
import { RecommendationController } from "../../controllers/RecommendationController";
import { RecommendationService } from "../../services/RecommendationService";

const menuItemController = new MenuItemController();
const recommendationController = new RecommendationController();

export function handleChef(socket: Socket, user: any) {
    socket.on('getMenuItems', async () => {
        const menuItems = await menuItemController.getMenuItems();
        socket.emit('getMenuItemsResponse', menuItems);
    });

    socket.on('getNextDayMenuRecommendation', async () => {
        const menuItems = await recommendationController.getNextDayMenuRecommendation();
        socket.emit('getNextDayMenuRecommendationResponse', menuItems);
    });

    socket.on('rolloutItemsChoiceForNextDay', async (items: any) => {
        const response = await recommendationController.rolloutItems(items);
        socket.emit('rolloutItemsChoiceForNextDayResponse', response);
    });
 
    socket.on('getFinalMenuRecommendation', async () => {
        const menuItems = await recommendationController.fetchFinalMenuRecommendation();
        socket.emit('getFinalMenuRecommendationResponse', menuItems);
    });   

    socket.on('rolloutFinalizedItems', async (items: any) => {
        const response = recommendationController.rolloutFinalizedMenuItems(items);
        socket.emit('rolloutFinalizedItemsResponse', response);
    })
}