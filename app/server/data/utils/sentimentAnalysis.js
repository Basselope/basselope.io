let sentiment = require('sentiment'),
stats = require("stats-lite");
function sentimentAnalyzer(){
	let analyzeReddit = function(reddits){
		for(var key in reddits){
			let sentiment = sentiment(reddits[key].comment);
			reddits[key].sentiment = sentiment;
		}

	}
	let twitter_rank = function(tweetIndividual) {
		let tweetText = tweetIndividual.text.replace(/\W+/g, " "),
			retweets = tweetIndividual.share_count, 
			favorites = tweetIndividual.vote_count,
			score = tweetIndividual.sentiment.score,
			mentions = tweetIndividual.mentions_to.length,
			comparative = tweetIndividual.sentiment.comparative;
		let results = 0;
		results += score;
	    results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
	    results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
	    results = results / tweetText.length;
	    //tweetIndividual.sentiment.w_score = results*100;
	  	return results*100;
	}
	let normal_dist_data_filter = function(content){
		let normalized = content;
		normalized.sort();
		let mean = stats.mean(normalized);
		let median = stats.median(normalized);
		let standardDeviation = stats.stdev(normalized);
		let mode = stats.mode(normalized);
		let variance = stats.variance(normalized);
		console.log();
		return {set: normalized,
				mean: mean,
				median:median,
				standardDeviation:standardDeviation,
				mode:mode,
				variance:variance};
	};
	let testFunction = function(stuff){
		console.log(this);
		console.log(stuff)
	};
	let analyzeTwit = function(textObject,callback){
		let analyzedResults = {};
		let tweet_sentiment = [];
		//console.log(textObject);
		let rankingHolder = [];
		for(var i in textObject){
			let curr = textObject[i];
			let content = curr.content;
			for(var j in content){

					content[j].sentiment = sentiment(content[j].text);
					content[j].sentiment.w_rank = twitter_rank(content[j]);
					rankingHolder.push(twitter_rank(content[j]));
			}
		}
		//let sentimentCalc= sentiment(textObject.text);
		//for (let attrname in sentimentCalc) { textObject.sentiment[attrname] = sentimentCalc[attrname]; }

		let tweet_with_graphical = {dataAnalysis: normal_dist_data_filter(rankingHolder),
									data:textObject};
		return tweet_with_graphical;
	};
	
	return {
		twitter: analyzeTwit,
		reddit: analyzeReddit,
		test: testFunction
	};
}

exports = module.exports = sentimentAnalyzer();



 



