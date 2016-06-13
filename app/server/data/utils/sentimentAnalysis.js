let sentiment = require('sentiment'),
stats = require("stats-lite");



function sentimentAnalyzer(){

	let analyzeReddit = function(){}

	let twitter_rank = function(tweetIndividual) {
		//console.log(tweetIndividual)
		let tweetText = tweetIndividual.text.replace(/\W+/g, " "),
			retweets = tweetIndividual.share_count, 
			favorites = tweetIndividual.vote_count,
			score = tweetIndividual.sentiment.score,
			mentions = tweetIndividual.mentions_to.length,
			comparative = tweetIndividual.sentiment.comparative;
		// console.log("======"+tweetText, retweets, favorites, score, comparative, mentions+"======")
		let results = 0;
		results += score;
	    results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
	    results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
	    results = results / tweetText.length;
	    //tweetIndividual.sentiment.w_score = results*100;
	    // console.log("RESULTS "+results);
	  	return results*100;
	}
	let normal_dist_data_filter = function(content){
		let normalized = content;
		// content.forEach(function(curr,index,arr){
		// 	normalized.push(curr.sentiment.w_score)
		// });
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
	let testFunction = function(stuff){
		console.log(this);
		console.log(stuff)
	}
	let analyzeTwit = function(textObject,callback){
		let analyzedResults = {};
		let tweet_sentiment = [];
		//console.log(textObject);
		let rankingHolder = [];
		for(var i in textObject){
			let curr = textObject[i];
			let content = curr.content;
				//console.log(curr.content);
			for(var j in content){
				//content[j].sentiment = sentiment(content[j].text)

				//let sentimentVal = sentiment(content[j].text);
				//if(sentimentVal.score!=0){
					//add user info to calculation
					//retweets+favotire/followers 
					content[j].sentiment = sentiment(content[j].text);
					content[j].sentiment.w_rank = twitter_rank(content[j]);
					rankingHolder.push(twitter_rank(content[j]));
					//console.log(twitter_rank(content[j]))

				//}
			}
			
			//return curr;
		}
		//let sentimentCalc= sentiment(textObject.text);
		//for (let attrname in sentimentCalc) { textObject.sentiment[attrname] = sentimentCalc[attrname]; }
		let tweet_with_graphical = {dataAnalysis: normal_dist_data_filter(rankingHolder),
									data:textObject};
		return tweet_with_graphical;
	}
	
	return {runTwit: analyzeTwit,
			runReddit: analyzeReddit,
			test: testFunction};
}

exports = module.exports = {};
exports.sentimentProps = sentimentAnalyzer();







// 		