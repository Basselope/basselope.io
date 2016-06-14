let sentiment = require('sentiment'),
		stats = require("stats-lite");
function sentimentAnalyzer(){
	let analyzeReddit = function(reddits){
		let rankingHolder = [];
		for(var key in reddits){
			let sentimentObj = sentiment(reddits[key].comment);
			reddits[key].sentiment = sentimentObj;
		//console.log("========="+JSON.stringify(reddits[key])+"------------");

			reddits[key].sentiment.w_rank = reddit_rank(reddits[key]);
					// if(isNaN(content[j])) console.log("--------------------"+JSON.stringify(content[j]))
			rankingHolder.push(reddits[key].sentiment.w_rank);


		}

		let normalData = normal_dist_data_filter(rankingHolder)
		let reddit_with_graphical = {data:reddits}
		for(var i in normalData){
			reddit_with_graphical[i] = normalData[i]
		}
		
		return reddit_with_graphical;

	};
	let reddit_rank = function(redditComment) {


		console.log("-----------"+JSON.stringify(redditComment))
		let tweetText = redditComment.comment.replace(/\W+/g, " "),
			voteResults = redditComment.score, 
			score = redditComment.sentiment.score,
			comparative = redditComment.sentiment.comparative;
		let results = 0;
		results += score+ (score*Math.abs(comparative));
	    //results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
	    //results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
	    //results = results / tweetText.length;
	    //tweetIndividual.sentiment.w_score = results*100;

	  	return [score*Math.abs(comparative), Math.abs(results)];
	}
		let twitter_rank = function(tweetIndividual) {
		let tweetText = tweetIndividual.text.replace(/\W+/g, " "),
			retweets = tweetIndividual.share_count, 
			favorites = tweetIndividual.vote_count,
			score = tweetIndividual.sentiment.score,
			mentions = tweetIndividual.mentions_to.length,
			comparative = tweetIndividual.sentiment.comparative;
		let results = 0;
		results += score+ (score*Math.abs(comparative));
	    //results += (retweets!=0?score/Math.abs(score)*(Math.log(retweets)/Math.log(2)):0);
	    //results += (favorites!=0?score/Math.abs(score)*(Math.log(favorites)/Math.log(2)):0);
	    //results = results / tweetText.length;
	    //tweetIndividual.sentiment.w_score = results*100;
	  	return [score*Math.abs(comparative), Math.abs(results)];
	};
	let normal_dist_data_filter = function(content){
		let normalized = content.map(function(curr, index, arr){
			return curr[1];
		});
		normalized.sort();
		let mean = stats.mean(normalized);
		let median = stats.median(normalized);
		let standardDeviation = stats.stdev(normalized);
		let mode = stats.mode(normalized);
		let variance = stats.variance(normalized);
		return {set: content,
				mean: mean,
				median:median,
				standardDeviation:standardDeviation,
				mode:mode,
				variance:variance};
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

				if(sentiment(content[j].text)!=0){
					content[j].sentiment = sentiment(content[j].text);
					content[j].sentiment.w_rank = twitter_rank(content[j]);
					//if(isNaN(content[j])) console.log("--------------------"+JSON.stringify(content[j]))
					rankingHolder.push(twitter_rank(content[j]));}
			}
		}
		//let sentimentCalc= sentiment(textObject.text);
		//for (let attrname in sentimentCalc) { textObject.sentiment[attrname] = sentimentCalc[attrname]; }

		let normalData = normal_dist_data_filter(rankingHolder)
		let tweet_with_graphical = {data:textObject}
		for(var i in normalData){
			tweet_with_graphical[i] = normalData[i]
		}
		
		return tweet_with_graphical;
	};
	
	return {
		twitter: analyzeTwit,
		reddit: analyzeReddit
	};
}

module.exports = sentimentAnalyzer();



 



