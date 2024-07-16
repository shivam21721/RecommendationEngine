import { Feedback, Response } from "../interfaces/Interface";
import { FeedbackRepository } from "../repositories/FeedbackRepository"
import { sentimentScoreGenerator } from "../utils/Sentiment";

export class FeedbackService {
    private feedbackRepository: FeedbackRepository;

    constructor() {
        this.feedbackRepository = new FeedbackRepository();
    }

    async addMenuFeedback(feedback: Feedback): Promise<Response<[]>> {
        try {
            const date = new Date();
            const dateString = date.toISOString().slice(0,10);
            const sentimentScore = sentimentScoreGenerator(feedback.comment);
            const feedbackData = {...feedback, feedbackDate: dateString, sentimentScore};
            const feedbackId = await this.feedbackRepository.addFeedback(feedbackData);
            const response: Response<[]> = {
                status: 'success',
                message:`Feedback Submitted Successfully, feedback id: ${feedbackId}`,
                data: []
            };
            return response;
        } catch(error) {
            throw error;
        }
    };
}