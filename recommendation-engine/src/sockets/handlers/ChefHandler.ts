import { Socket } from "socket.io";
import { MenuItemController } from "../../controllers/MenuItemController";
import { RecommendationController } from "../../controllers/RecommendationController";

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
}