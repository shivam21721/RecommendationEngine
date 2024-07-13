"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentimentScoreGenerator = void 0;
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
function sentimentScoreGenerator(comment) {
    const result = sentiment.analyze(comment);
    const comparative = result.comparative;
    let score;
    if (comparative <= -1) {
        score = 1;
    }
    else if (comparative > -1 && comparative <= -0.5) {
        score = 2;
    }
    else if (comparative > -0.5 && comparative <= 0.5) {
        score = 3;
    }
    else if (comparative > 0.5 && comparative <= 1) {
        score = 4;
    }
    else {
        score = 5;
    }
    return score;
}
exports.sentimentScoreGenerator = sentimentScoreGenerator;
