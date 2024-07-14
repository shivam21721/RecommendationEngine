import { FeedbackService } from "../services/FeedbackService";
import { Response } from "../interfaces/Interface";

export class FeedbackController {
    private feedbackService: FeedbackService;

    constructor() {
        this.feedbackService = new FeedbackService();
    }

    async addMenuFeedback(feedback: any): Promise<Response<[]>> {
        try{
            const response = await this.feedbackService.addMenuFeedback(feedback);
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