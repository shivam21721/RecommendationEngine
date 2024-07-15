import { FeedbackService } from "../services/FeedbackService";
import { Feedback, Payload, Response } from "../interfaces/Interface";
import { isAuthorizedUser } from "../utils/Authorization";
import { UserRole } from "../enums/UserRoles";

export class FeedbackController {
    private feedbackService: FeedbackService;

    constructor() {
        this.feedbackService = new FeedbackService();
    }

    async addMenuFeedback(payload: Payload<Feedback>): Promise<Response<[]>> {
        try{
            if(!isAuthorizedUser(payload.userId, [UserRole.Employee])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.feedbackService.addMenuFeedback(payload.data);
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            };
            return response;
        }
    }
}