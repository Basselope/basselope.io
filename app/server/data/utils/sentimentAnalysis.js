var sentiment = require('sentiment');

// var r1 = sentiment('Cats are stupid.');
// console.dir(r1);     
// var r1 = sentiment('Cats are [stupid] and i hate them');
// console.dir(r1);     
// var r1 = sentiment('Cats are very [stupid] and i hate them');
// console.dir(r1);     
// var r1 = sentiment('Cats are %stupid% but i love them');
// console.dir(r1);   
// var r1 = sentiment('Cats are stu pid and i love them');
// console.dir(r1);     
// var r1 = sentiment('Cats are [lovely animals]');
// console.dir(r1);     
// var r1 = sentiment('fuck the world i hate murder');
// console.dir(r1);
// var r1 = sentiment('fuck this bitch world i hate murder very very bad');
// console.dir(r1);        // Score: -2, Comparative: -0.666

// var r2 = sentiment('Cats are totally amazing!');
// console.dir(r2);  



function sentimentAnalyzer(){

	var analyze = function(textObject,callback){

		




		var sentimentCalc= sentiment(textObject.text);
		for (var attrname in sentimentCalc) { textObject.sentiment[attrname] = sentimentCalc[attrname]; }
		return textObject;
	};
	
	return {runTwit: analyzeTwit,
			runNews: analyzeNews};
}

var exports = module.exports = {};
exports.sentimentAnalysis = sentimentAnalyzer().run;




// function performAnalysis(tweetSet) {
//   //set a results variable
//   var results = 0;
//   // iterate through the tweets, pulling the text, retweet count, and favorite count
// 		  for(var i = 0; i < tweetSet.length; i++) {
// 		    tweet = tweetSet[i]['text'];
// 		    retweets = tweetSet[i]['retweet_count'];
// 		    favorites = tweetSet[i]['favorite_count'];
// 		    // remove the hastag from the tweet text
// 		    tweet = tweet.replace('#', '');
// 		    // perform sentiment on the text
// 		    var score = sentimental.analyze(tweet)['score'];
// 		    // calculate score
// 		    results += score;
// 		    if(score > 0){
// 		      if(retweets > 0) {
// 		        results += (Math.log(retweets)/Math.log(2));
// 		      }
// 		      if(favorites > 0) {
// 		        results += (Math.log(favorites)/Math.log(2));
// 		      }
// 		    }
// 		    else if(score < 0){
// 		      if(retweets > 0) {
// 		        results -= (Math.log(retweets)/Math.log(2));
// 		      }
// 		      if(favorites > 0) {
// 		        results -= (Math.log(favorites)/Math.log(2));
// 		      }
// 		    }
// 		    else {
// 		      results += 0;
// 		    }
// 		  }
// 		  // return score
// 		  results = results / tweetSet.length;
// 		  return results
// 		}



// 		