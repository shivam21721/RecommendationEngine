import { RecommendationRepository } from "../repositories/RecommendationRepository";
import { NotificationService } from "./NotificationService";
import { prepareRecommendation, prepareRecommendationForFinalMenu } from "../utils/RecommendationEngine";
import { constructMenu } from "../utils/Menu";

export class RecommendationService {
    private recommendationRepository: RecommendationRepository;
    private notificationService: NotificationService;

    constructor() {
        this.recommendationRepository = new RecommendationRepository();
        this.notificationService = new NotificationService();
    }

    async getNextDayMenuRecommendation() {
        try {
            const recommendedMenu = await this.recommendationRepository.getMenuForRecommendation();
            return prepareRecommendation(recommendedMenu);
        } catch (error) {
            throw error;
        }
    }

    async rolloutItems(items: any) {
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

            const response = await this.recommendationRepository.addRecommendedItems([...breakfastItems, ...lunchItems, ...dinnerItems]);
            await this.notificationService.sendNotificationForRolledOutItems();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async fetchFinalMenuRecommendation() {
        try {
            const recommendedMenu = await this.recommendationRepository.fetchFinalMenuRecommendation();
            const sortedRecommendedMenu = prepareRecommendationForFinalMenu(recommendedMenu);
            console.log(sortedRecommendedMenu);
            const response: any = {};
            response.breakfast = sortedRecommendedMenu.filter((item: any) => {
                if(item.mealType === 'breakfast') return true;
                return false;
            });
            
            response.lunch = sortedRecommendedMenu.filter((item: any) => {
                if(item.mealType === 'lunch') return true;
                return false;
            });

            response.dinner = sortedRecommendedMenu.filter((item: any) => {
                if(item.mealType === 'dinner') return true;
                return false;
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async rolloutFinalizedMenuItems(itemIds: string[]) {
        try {
            const response = await this.recommendationRepository.markItemAsPrepared(itemIds);
            await this.notificationService.sendNotificationForFinalizedMenuItems();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPreparedMenuForToday() {
        try {
            const menuItems:any = await this.recommendationRepository.getPreparedMenuForToday();
            const response: any = {};
            response.breakfast = menuItems.filter((item: any) => {
                if(item.mealType === 'breakfast') return true;
                return false;
            });
            
            response.lunch = menuItems.filter((item: any) => {
                if(item.mealType === 'lunch') return true;
                return false;
            });

            response.dinner = menuItems.filter((item: any) => {
                if(item.mealType === 'dinner') return true;
                return false;
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getNextDayFinalizedMenu() {
        try {
            const menuItems = await this.recommendationRepository.getNextDayFinalizedMenu();
            return constructMenu(menuItems);
        } catch(error) {
            throw error;
        }
    }
}