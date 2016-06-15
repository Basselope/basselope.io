let sentiment = require('sentiment'),
    stats = require("stats-lite");

function sentimentAnalyzer() {
    const ranking = (tweetIndividual) => {
        let tweetText = tweetIndividual.text.replace(/\W+/g, " "),
            retweets = tweetIndividual.share_count || 0,
            favorites = tweetIndividual.vote_count || 0,
            downCount = tweetIndividual.down_count || 0,
            score = tweetIndividual.sentiment.score || 0,
            //mentions = tweetIndividual.mentions_to.length,
            comparative = tweetIndividual.sentiment.comparative;
        let results = 0;
        results += score + (score * Math.abs(comparative));
        //results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
        //results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
        //results = results / tweetText.length;
        //tweetIndividual.sentiment.w_score = results*100;
        return [score * Math.abs(comparative), Math.abs(results)];
    };

    const normal_dist_data_filter = (content) => {
        let normalized = content.map(function(curr, index, arr) {
            return curr[1];
        });
        normalized.sort();
        return {
            set: content,
            mean: stats.mean(normalized),
            median: stats.median(normalized),
            standardDeviation: stats.stdev(normalized),
            mode: stats.mode(normalized),
            variance: stats.variance(normalized)
        };
    };

    const analyze = (textObject) => {
        let analyzedResults = {};
        let rankingHolder = [];
        for (var postKey in textObject) {
            let curr = textObject[postKey];
            let content = curr.content;
            for (var contentKey in content) {
            	let currentSentiment = sentiment(content[contentKey].text);
                if (currentSentiment.positive.length != 0 || currentSentiment.negative.length != 0) {
                    content[contentKey].sentiment = currentSentiment;
                    content[contentKey].sentiment.w_rank = ranking(content[contentKey]);
                    rankingHolder.push(content[contentKey].sentiment.w_rank);
                }else{
                	delete textObject[postKey].content;
                }
            }
        }
        let normalData = normal_dist_data_filter(rankingHolder);
        let data_W_analysis = {
            data: textObject
        }
        for (let dataKey in normalData) {
            data_W_analysis[dataKey] = normalData[dataKey]
        }
        return data_W_analysis;
    };
    return {
        twitter: analyze,
        reddit: analyze
    };
}

module.exports = sentimentAnalyzer();