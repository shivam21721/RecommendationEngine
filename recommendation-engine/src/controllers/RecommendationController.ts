import { RecommendationService } from "../services/RecommendationService";
import { Payload, RecommendedMenu, Response, SelectedMenuItems } from "../interfaces/Interface";

export class RecommendationController {
    private recommendationService: RecommendationService;

    constructor() {
        this.recommendationService = new RecommendationService();
    }

    async getNextDayMenuRecommendation(): Promise<Response<RecommendedMenu[] | []>> {
        try {
            const response = await this.recommendationService.getNextDayMenuRecommendation();
            return response;
        } catch (error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async rolloutItems(items: any): Promise<Response<[]>> {
        try {
            const response = await this.recommendationService.rolloutItems(items);
            return response;
        } catch (error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async fetchFinalMenuRecommendation(): Promise<Response<any | []>> {
        try {
            const response = await this.recommendationService.fetchFinalMenuRecommendation();
            return response;
        } catch (error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async rolloutFinalizedMenuItems(payload: Payload<SelectedMenuItems>): Promise<Response<[]>> {
        try {
            const response = await this.recommendationService.rolloutFinalizedMenuItems(payload.data);
            return response;
        } catch (error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }
}