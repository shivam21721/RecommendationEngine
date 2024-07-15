import { RecommendationRepository } from "../repositories/RecommendationRepository";
import { NotificationService } from "./NotificationService";
import { prepareRecommendation, prepareRecommendationForFinalMenu } from "../utils/RecommendationEngine";
import { constructMenu } from "../utils/Menu";
import { RecommendedMenu, Response, Payload, SelectedMenuItems } from "../interfaces/Interface";

export class RecommendationService {
    private recommendationRepository: RecommendationRepository;
    private notificationService: NotificationService;

    constructor() {
        this.recommendationRepository = new RecommendationRepository();
        this.notificationService = new NotificationService();
    }

    async getNextDayMenuRecommendation(): Promise<Response<RecommendedMenu[]>> {
        try {
            const recommendedMenu = await this.recommendationRepository.getMenuForRecommendation();
            const preparedRecommendation = prepareRecommendation(recommendedMenu);
            const response: Response<RecommendedMenu[]> = {
                status: 'success',
                message: 'Successfully fetched next day menu recommendation menu',
                data: preparedRecommendation
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    async rolloutItems(items: SelectedMenuItems): Promise<Response<[]>> {
        try {

            var breakfastItems = items.breakfast.map((id: any) => {
                const date = new Date();
                return {id: parseInt(id), mealType: 'breakfast', date: date.toISOString().slice(0,10)};
            });

            var lunchItems = items.lunch.map((id: any) => {
                const date = new Date();
                return {id: parseInt(id), mealType: 'lunch', date: date.toISOString().slice(0,10)};
            });

            var dinnerItems = items.dinner.map((id: any) => {
                const date = new Date();
                return {id: parseInt(id), mealType: 'dinner', date: date.toISOString().slice(0,10)};
            });

            const itemsCount = await this.recommendationRepository.addRecommendedItems([...breakfastItems, ...lunchItems, ...dinnerItems]);
            await this.notificationService.sendNotificationForRolledOutItems();
            const response: Response<[]> = {
                status: 'success',
                message: `Successfully rolled out ${itemsCount} menu Items`,
                data: []
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    async fetchFinalMenuRecommendation(): Promise<Response<any>> {
        try {
            const recommendedMenu = await this.recommendationRepository.fetchFinalMenuRecommendation();
            const sortedRecommendedMenu = prepareRecommendationForFinalMenu(recommendedMenu);
            const finalRecommendedMenuData = constructMenu(sortedRecommendedMenu);
                
            const response: Response<any> = {
                status: 'success',
                message: 'Successfully sent the notification',
                data: finalRecommendedMenuData
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    async rolloutFinalizedMenuItems(items: SelectedMenuItems): Promise<Response<[]>> {
        try {
            var breakfastItems = items.breakfast.map((id: any) => {
                return {id: parseInt(id), mealType: 'breakfast'};
            });

            var lunchItems = items.lunch.map((id: any) => {
                return {id: parseInt(id), mealType: 'lunch'};
            });

            var dinnerItems = items.dinner.map((id: any) => {
                return {id: parseInt(id), mealType: 'dinner'};
            });
            const itemsCount = await this.recommendationRepository.markItemAsPrepared([...breakfastItems, ...lunchItems, ...dinnerItems]);
            const notificationResponse = await this.notificationService.sendNotificationForFinalizedMenuItems();
            const response: Response<[]> = {
                status: 'success',
                message: 'Successfully Rolled out finalized Menu Items',
                data: []
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPreparedMenuForToday(): Promise<Response<any>> {
        try {
            const menuItems:any = await this.recommendationRepository.getPreparedMenuForToday();
            const menuItemsData = constructMenu(menuItems);
    
            const response: Response<any> = {
                status: 'success',
                message: 'Successfully fetched Menu for today',
                data: menuItemsData
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getNextDayFinalizedMenu(): Promise<Response<any>> {
        try {
            const menuItems = await this.recommendationRepository.getNextDayFinalizedMenu();
            const menuItesData =  constructMenu(menuItems);
            const response: Response<any> = {
                status: 'success',
                message: 'Successfully fetched all the menu Items',
                data: menuItesData
            };
            return response;
        } catch(error) {
            throw error;
        }
    }
}