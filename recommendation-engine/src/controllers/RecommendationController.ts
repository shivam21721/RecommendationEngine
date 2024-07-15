import { RecommendationService } from "../services/RecommendationService";
import { Payload, RecommendedMenu, Response, SelectedMenuItems } from "../interfaces/Interface";
import { isAuthorizedUser } from "../utils/Authorization";
import { UserRole } from "../enums/UserRoles";

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

    async rolloutItems(payload: Payload<SelectedMenuItems>): Promise<Response<[]>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Chef])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.recommendationService.rolloutItems(payload.data);
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

    async fetchFinalMenuRecommendation(payload: Payload<null>): Promise<Response<any | []>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Chef])) {
                throw new Error("Unauthorized user");
            }
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
            if(!isAuthorizedUser(payload.userId, [UserRole.Chef])) {
                throw new Error("Unauthorized user");
            }
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