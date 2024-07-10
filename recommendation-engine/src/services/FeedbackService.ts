import { FeedbackRepository } from "../repositories/FeedbackRepository"
export class FeedbackService {
    private feedbackRepository: FeedbackRepository;

    constructor() {
        this.feedbackRepository = new FeedbackRepository();
    }

    async addMenuFeedback(feedback: any) {
        try {
            const date = new Date();
            const dateString = date.toISOString().slice(0,10);
            const sentimentScore = 5;
            feedback = {...feedback, feedbackDate: dateString, sentimentScore};
            const response = await this.feedbackRepository.addFeedback(feedback);
            return response;
        } catch(error) {
            throw error;
        }
    };
}