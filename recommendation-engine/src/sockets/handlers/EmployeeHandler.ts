import { Socket } from "socket.io";
import { MenuItemController } from "../../controllers/MenuItemController";
import { FeedbackController } from "../../controllers/FeedbackController";
import { NotificationController } from "../../controllers/NotificationController";
import { Payload, SelectedMenuItems } from "../../interfaces/Interface";

const menuItemController = new MenuItemController();
const feedbackController = new FeedbackController();
const notificationController = new NotificationController();

export function handleEmployee(socket: Socket, user: any) {

    socket.on('getTodayMenu', async () => {
        const response = await menuItemController.getTodayMenu();
        socket.emit('getTodayMenuResponse', response);
    });

    socket.on('getRolledOutMenu', async () => {
        const response = await menuItemController.fetchRolledOutMenu();
        socket.emit('getRolledOutMenuResponse', response);
    });

    socket.on('voteMenuItems', async (payload: Payload<SelectedMenuItems>) => {
        const response = await menuItemController.updateVotedMenuItems(payload);
        socket.emit('voteMenuItemsResponse', response);
    });

    socket.on('addFeedback', async (feedback) => {
        const response = await feedbackController.addMenuFeedback(feedback);
        socket.emit('addFeedbackResponse', response);
    });

    socket.on('fetchUserNotifications', async (userId) => {
        const response = await notificationController.getUserNotifications(userId);
        socket.emit('fetchUserNotificationsResponse', response);
    });

    socket.on('fetchNextDayFinalizedMenu', async () => {
        const response = await menuItemController.getNextDayFinalizedMenu();
        socket.emit('fetchNextDayFinalizedMenuResponse', response);
    })
}