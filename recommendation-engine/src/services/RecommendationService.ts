import { RecommendationRepository } from "../repositories/RecommendationRepository";
import { prepareRecommendation, prepareRecommendationForFinalMenu } from "../utility/RecommendationEngine";

export class RecommendationService {
    private recommendationRepository: RecommendationRepository;

    constructor() {
        this.recommendationRepository = new RecommendationRepository();
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
        // var recommendedItemsDetails = [];
        try {
          var recommendedItemsData = itemIds.map((id: string) => {
                const date =new Date();
                console.log({id: parseInt(id), date})
                return {id: parseInt(id), date: date.toISOString().slice(0,10)};
            });
          const response = await this.recommendationRepository.addRecommendedItems(recommendedItemsData);
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
}