import { RecommendationRepository } from "../repositories/RecommendationRepository";
import { NotificationService } from "./NotificationService";
import { prepareRecommendation, prepareRecommendationForFinalMenu } from "../utility/RecommendationEngine";

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

    async rolloutItems(itemIds: string[]) {
        try {
          var recommendedItemsData = itemIds.map((id: string) => {
                const date =new Date();
                console.log({id: parseInt(id), date})
                return {id: parseInt(id), date: date.toISOString().slice(0,10)};
            });
          const response = await this.recommendationRepository.addRecommendedItems(recommendedItemsData);
          await this.notificationService.sendNotificationForRolledOutItems();
          return response;
        } catch (error) {
            throw error;
        }
    }

    async fetchFinalMenuRecommendation() {
        try {
            const recommendedMenu = await this.recommendationRepository.fetchFinalMenuRecommendation();
            return prepareRecommendationForFinalMenu(recommendedMenu);
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
            const response = this.recommendationRepository.getPreparedMenuForToday();
            return response
        } catch (error) {
            throw error;
        }
    }
}