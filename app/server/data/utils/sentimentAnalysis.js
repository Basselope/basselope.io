let sentiment = require('sentiment'),
		stats = require("stats-lite");
function sentimentAnalyzer(){


	let ranking = function(tweetIndividual) {
		let tweetText = tweetIndividual.text.replace(/\W+/g, " "),
			retweets = tweetIndividual.share_count || 0, 
			favorites = tweetIndividual.vote_count || 0,
			downCount = tweetIndividual.down_count || 0,
			score = tweetIndividual.sentiment.score || 0,
			//mentions = tweetIndividual.mentions_to.length,
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
	let analyze = function(textObject){

		let analyzedResults = {};
		let rankingHolder = [];
		for(var i in textObject){
			let curr = textObject[i];
			let content = curr.content;
			for(var j in content){
				if(content[j].text && sentiment(content[j].text)!=0){
					content[j].sentiment = sentiment(content[j].text);
					content[j].sentiment.w_rank = ranking(content[j]);
					rankingHolder.push(content[j].sentiment.w_rank);}
			}
		}
		//let sentimentCalc= sentiment(textObject.text);
		//for (let attrname in sentimentCalc) { textObject.sentiment[attrname] = sentimentCalc[attrname]; }

		let normalData = normal_dist_data_filter(rankingHolder);
		let data_W_analysis = {data:textObject}
		for(var i in normalData){
			data_W_analysis[i] = normalData[i]
		}
		//console.log(JSON.stringify(tweet_with_graphical));
		return data_W_analysis;


	};
	
	
	return {
		twitter: analyze,
		reddit: analyze
	};
}

module.exports = sentimentAnalyzer();



 



