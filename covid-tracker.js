// Class import

const TwitterBot = require('./TwitterBot.js');
const DataGetter = require('./DataGetter.js');

// Objects instanciation

let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();

// Main

dataGetter.updateData();
var dataToTweet = dataGetter.getData();
twitterBot.tweet(dataToTweet);