"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareRecommendationForFinalMenu = exports.prepareRecommendation = void 0;
function prepareRecommendation(items) {
    const ratingWeight = 0.5;
    const sentimentWeight = 0.3;
    const preparedWeight = 0.2;
    console.log(items);
    var itemsWithPriorityScore = items.map((item) => {
        const priorityScore = (item.avgRating * ratingWeight + item.avgSentiment * sentimentWeight + item.preparedCount * preparedWeight).toFixed(2);
        return Object.assign(Object.assign({}, item), { priorityScore });
    });
    itemsWithPriorityScore.sort((item1, item2) => {
        return item2.priorityScore - item1.priorityScore;
    });
    return itemsWithPriorityScore;
}
exports.prepareRecommendation = prepareRecommendation;
;
function prepareRecommendationForFinalMenu(items) {
    const ratingWeight = 0.3;
    const voteWeight = 0.3;
    const sentimentWeight = 0.2;
    const preparedWeight = 0.2;
    console.log(items);
    var itemsWithPriorityScore = items.map((item) => {
        const priorityScore = (item.avgRating * ratingWeight + item.avgSentiment * sentimentWeight + item.preparedCount * preparedWeight + item.voteCount * voteWeight).toFixed(2);
        console.log(priorityScore);
        return Object.assign(Object.assign({}, item), { priorityScore });
    });
    itemsWithPriorityScore.sort((item1, item2) => {
        return item2.priorityScore - item1.priorityScore;
    });
    return itemsWithPriorityScore;
}
exports.prepareRecommendationForFinalMenu = prepareRecommendationForFinalMenu;
