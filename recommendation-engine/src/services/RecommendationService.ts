import { RecommendationRepository } from "../repositories/RecommendationRepository";

export class RecommendationService {
    private recommendationRepository: RecommendationRepository;

    constructor() {
        this.recommendationRepository = new RecommendationRepository();
    }

    async getNextDayMenuRecommendation() {
        try {
            const recommendedMenu = await this.recommendationRepository.getMenuForRecommendation();
            return recommendedMenu;
        } catch (error) {
            throw error;
        }
    }
}