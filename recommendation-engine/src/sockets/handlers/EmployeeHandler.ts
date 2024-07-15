import { Socket } from "socket.io";
import { MenuItemController } from "../../controllers/MenuItemController";
import { FeedbackController } from "../../controllers/FeedbackController";
import { NotificationController } from "../../controllers/NotificationController";
import { Payload, SelectedMenuItems } from "../../interfaces/Interface";

const menuItemController = new MenuItemController();
const feedbackController = new FeedbackController();
const notificationController = new NotificationController();

export function handleEmployee(socket: Socket, user: any) {

    socket.on('getTodayMenu', async (payload) => {
        const response = await menuItemController.getTodayMenu(payload);
        socket.emit('getTodayMenuResponse', response);
    });

    socket.on('getRolledOutMenu', async (payload) => {
        const response = await menuItemController.fetchRolledOutMenu(payload);
        socket.emit('getRolledOutMenuResponse', response);
    });

    socket.on('voteMenuItems', async (payload) => {
        const response = await menuItemController.updateVotedMenuItems(payload);
        socket.emit('voteMenuItemsResponse', response);
    });

    socket.on('addFeedback', async (payload) => {
        const response = await feedbackController.addMenuFeedback(payload);
        socket.emit('addFeedbackResponse', response);
    });

    socket.on('fetchUserNotifications', async (payload) => {
        const response = await notificationController.getUserNotifications(payload);
        socket.emit('fetchUserNotificationsResponse', response);
    });

    socket.on('fetchNextDayFinalizedMenu', async (payload) => {
        const response = await menuItemController.getNextDayFinalizedMenu(payload);
        socket.emit('fetchNextDayFinalizedMenuResponse', response);
    })
}