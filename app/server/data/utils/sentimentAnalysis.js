var sentiment = require('sentiment');
var stats = require("stats-lite")


function sentimentAnalyzer(){

	let analyzeReddit = function(){}

	let twitter_rank = function(tweetIndividual) {
		let tweetText = tweetIndividual.text.replace(/\W+/g, " "),
		retweets = tweetIndividual.retweetCount, 
		favorites = tweetIndividual.favorited,
		score = tweetIndividual.sentiment.score,
		comparative = tweetIndividual.sentiment.comparative;
		//console.log(tweetText, retweets, favorites, score, comparative)
  			let results = 0;
			results += score;
		    results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
		    results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
		    results = results / tweetText.length;
		    tweetIndividual.sentiment.w_score = results*100;
		    console.log("RESULTS "+results);
		  	return tweetIndividual
		}
	let normal_dist_data_filter = function(content){
		let normalized = [];
		content.forEach(function(curr,index,arr){
			normalized.push(curr.sentiment.w_score)
		});
		normalized.sort();
		//let mean = normalized.reduce(function(a,b){return a+b;})/normalized.length;
		//let median = (normalized[Math.floor((normalized.length - 1) / 2)] + normalized[Math.ceil((normalized.length - 1) / 2)]) / 2;
		let mean = stats.mean(normalized);
		let median = stats.median(normalized);
		let standardDeviation = stats.stdev(normalized);
		let mode = stats.mode(normalized);
		let variance = stats.variance(normalized);
		return {set: normalized,
				mean: mean,
				median:median,
				standardDeviation:standardDeviation,
				mode:mode,
				variance:variance};
	}

	let analyzeTwit = function(textObject,callback){
		let analyzedResults = {};
		let tweet_sentiment = [];
		textObject.forEach(function(curr,index,arr){
			let sentimentVal = sentiment(curr.text);
			if(sentimentVal.score!=0){
				curr.id = index; 
				curr.sentiment = sentiment(curr.text);
				tweet_sentiment.push(twitter_rank(curr));

			}
			//return curr;
		});
		//let sentimentCalc= sentiment(textObject.text);
		//for (let attrname in sentimentCalc) { textObject.sentiment[attrname] = sentimentCalc[attrname]; }
		let tweet_with_graphical = {graph_meta: normal_dist_data_filter(tweet_sentiment),
									tweet_sentiment:tweet_sentiment};
		return tweet_with_graphical;
	}
	
	return {runTwit: analyzeTwit,
			runReddit: analyzeReddit};
}

exports = module.exports = {};
exports.sentimentProps = sentimentAnalyzer();







// 		