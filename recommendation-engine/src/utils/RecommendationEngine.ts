import { FinalizedMenuItem, RecommendedMenu } from "../interfaces/Interface";

export function prepareRecommendation(items: RecommendedMenu[]) {
    const ratingWeight = 0.5;
    const sentimentWeight = 0.3;
    const preparedWeight = 0.2;
    var itemsWithPriorityScore = items.map((item: RecommendedMenu) => {
        const priorityScore = (item.avgRating * ratingWeight + item.avgSentiment * sentimentWeight + item.preparedCount * preparedWeight).toFixed(2);
        return {...item, priorityScore: Number(priorityScore)};
    })

    itemsWithPriorityScore.sort((item1: any, item2: any) => {
        return item2.priorityScore - item1.priorityScore;
    });

    return itemsWithPriorityScore;
};

export function prepareRecommendationForFinalMenu(items: FinalizedMenuItem[]) {
    const ratingWeight = 0.3;
    const voteWeight = 0.3;
    const sentimentWeight = 0.2;
    const preparedWeight = 0.2;
    var itemsWithPriorityScore = items.map((item: any) => {
        const priorityScore = (item.avgRating * ratingWeight + item.avgSentiment * sentimentWeight + item.preparedCount * preparedWeight + item.voteCount * voteWeight).toFixed(2);
        console.log(priorityScore);
        return {...item, priorityScore};
    })

    itemsWithPriorityScore.sort((item1: any, item2: any) => {
        return item2.priorityScore - item1.priorityScore;
    });

    return itemsWithPriorityScore;
}