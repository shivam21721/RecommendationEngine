import { FeedbackService } from "../services/FeedbackService";

export class FeedbackController {
    private feedbackService: FeedbackService;

    constructor() {
        this.feedbackService = new FeedbackService();
    }

    async addMenuFeedback(feedback: any) {
        try{
            const response = await this.feedbackService.addMenuFeedback(feedback);
            return response;
        } catch(error) {
            console.log(error);
        }
    }
}