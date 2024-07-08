import { RecommendationService } from "../services/RecommendationService";
export class RecommendationController {
    private recommendationService: RecommendationService;

    constructor() {
        this.recommendationService = new RecommendationService();
    }

    async getNextDayMenuRecommendation() {
        try {
            const recommendedMenu = await this.recommendationService.getNextDayMenuRecommendation();
            return recommendedMenu;
        } catch (error) {
            return error;
        }
    }

    async rolloutItems(itemIds: any) {
        try {
            const response = await this.recommendationService.rolloutItems(itemIds);
            return response;
        } catch (error) {
            return error;
        }
    }

    async fetchFinalMenuRecommendation() {
        try {
            const recommendedMenu = await this.recommendationService.fetchFinalMenuRecommendation();
            return recommendedMenu;
        } catch (error) {
            return error;
        }
    }
}