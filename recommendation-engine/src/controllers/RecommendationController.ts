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

    async rolloutItems(items: any) {
        try {
            const response = await this.recommendationService.rolloutItems(items);
            return response;
        } catch (error) {
            return error;
        }
    }

    async fetchFinalMenuRecommendation() {
        try {
            const response = await this.recommendationService.fetchFinalMenuRecommendation();
            return response;
        } catch (error) {
            return error;
        }
    }

    async rolloutFinalizedMenuItems(items: any) {
        try {
            const response = await this.recommendationService.rolloutFinalizedMenuItems(items);
            return response;
        } catch (error) {
            return error;
        }
    }
}