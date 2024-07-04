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
}