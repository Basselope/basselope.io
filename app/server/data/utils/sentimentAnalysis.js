let sentiment = require('sentiment'),
    stats = require("stats-lite");

function sentimentAnalyzer() {

    const ranking = (content, author) => {
        let tweetText = content.text.replace(/\W+/g, " "),
            retweets = content.share_count || 0,
            favorites = content.vote_count || 0,
            downCount = content.down_count || 0,
            score = content.sentiment.score || 0,
            friends = content.friend_count || 0,
            listed = content.listed_count || 0, //list of members to
            status = content.status_count || 0,
            //mentions = content.mentions_to.length,
            comparative = content.sentiment.comparative;
            //console.log(JSON.stringify(author))



        let results = 0;
        results += score + Math.abs((score * comparative));
        //results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
        //results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
        //results = results / tweetText.length;
        //tweetIndividual.sentiment.w_score = results*100;
        let returnScore = score * Math.abs(comparative);

        return [returnScore, Math.abs(results)];
    };

    const normal_dist_data_filter = (content) => {

        let normalized = content.map(function(curr, index, arr) {
            return curr[1];
        });

        normalized.sort();
        var count = normalized.length;
        return {
            set: content,
            setSize: normalized.length,
            mean: stats.mean(normalized),
            median: stats.median(normalized),
            standardDeviation: stats.stdev(normalized),
            mode: stats.mode(normalized),
            variance: stats.variance(normalized)
        };
    };

    const additionalCalc = (content, rankings) =>{

    };

    const analyze = (textObject) => {
        let analyzedResults = {};
        let rankingHolder = [];
        let negativeSentiments = 0;
        let positiveSentiments = 0;
        let maxSentimentImpact = {actualTweet:'', sentimentStrength:0, votes:0, posNeg:""};
        for (var postKey in textObject) {
            let curr = textObject[postKey];
            let content = curr.content;
            for (var contentKey in content) {
            	let currentSentiment = sentiment(content[contentKey].text);
                if (currentSentiment.positive.length != 0 || currentSentiment.negative.length != 0) {
                    content[contentKey].sentiment = currentSentiment;
                    
                    if(currentSentiment<0)
                    	negativeSentiments++
                    if(currentSentiment>0)
                    	positiveSentiments++


                    content[contentKey].sentiment.w_rank = ranking(content[contentKey], textObject[postKey].author);
                    let rankProp = content[contentKey].sentiment.w_rank[1];
                     if(maxSentimentImpact.sentimentStrength <rankProp){
                    	console.log("----------",content[contentKey].sentiment.w_rank, content[contentKey].text, content[contentKey].vote_count, content[contentKey].sentiment)
                    	maxSentimentImpact.sentimentStrength = content[contentKey].sentiment.w_rank[0]; 
                    	maxSentimentImpact.actualTweet = content[contentKey].text;
                    	maxSentimentImpact.votes = content[contentKey].vote_count;
                    	maxSentimentImpact.posNeg = content[contentKey].sentiment<0?"Negative":"Positive"
                    }

                    rankingHolder.push(content[contentKey].sentiment.w_rank);
                }else{
                	delete textObject[postKey].content;
                }
            }
        }

        let normalData = normal_dist_data_filter(rankingHolder);
        console.log("RANKING HOLDER",rankingHolder, rankingHolder.length)
		negativeSentiments	 = negativeSentiments/rankingHolder.length
		positiveSentiments	 = positiveSentiments/rankingHolder.length
		normalData.percentPositive = positiveSentiments;
		normalData.percentNegative = negativeSentiments;
        let data_W_analysis = {
            data: textObject
        }
        for (let dataKey in normalData) {
            data_W_analysis[dataKey] = normalData[dataKey]
        }
        for (let dataKey in maxSentimentImpact) {
            data_W_analysis[dataKey] = maxSentimentImpact[dataKey]
        }
        return data_W_analysis;
    };
    return {
        twitter: analyze,
        reddit: analyze
    };
}

module.exports = sentimentAnalyzer();