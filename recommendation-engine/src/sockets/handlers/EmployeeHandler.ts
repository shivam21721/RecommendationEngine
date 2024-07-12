import { Socket } from "socket.io";
import { MenuItemController } from "../../controllers/MenuItemController";
import { FeedbackController } from "../../controllers/FeedbackController";
import { NotificationController } from "../../controllers/NotificationController";
import { SocketAddress } from "net";

const menuItemController = new MenuItemController();
const feedbackController = new FeedbackController();
const notificationController = new NotificationController();

export function handleEmployee(socket: Socket, user: any) {
    socket.on('getTodayMenu', async () => {
        const menuItems = await menuItemController.getTodayMenu();
        socket.emit('getTodayMenuResponse', menuItems);
    });

    socket.on('getRolledOutMenu', async () => {
        const rolledOutMenu = await menuItemController.fetchRolledOutMenu();
        socket.emit('getRolledOutMenuResponse', rolledOutMenu);
    });

    socket.on('voteMenuItems', async (itemIds) => {
        const response = await menuItemController.updateVotedMenuItems(itemIds);
        socket.emit('voteMenuItemsResponse', response);
    });

    socket.on('addFeedback', async (feedback) => {
        const response = await feedbackController.addMenuFeedback(feedback);
        socket.emit('addFeedbackResponse', response);
    });

    socket.on('fetchUserNotifications', async (userId) => {
        const notifications = await notificationController.getUserNotifications(userId);
        socket.emit('fetchUserNotificationsResponse', notifications);
    });

    socket.on('fetchNextDayFinalizedMenu', async () => {
        const menuItems = await menuItemController.getNextDayFinalizedMenu();
        socket.emit('fetchNextDayFinalizedMenuResponse', menuItems);
    })
}