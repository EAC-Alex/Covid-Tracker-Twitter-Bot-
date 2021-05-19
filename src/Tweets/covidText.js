// Class import
const TwitterBot = require('../TwitterBot/TwitterBot.js');
const DataGetter = require('../Data/DataGetter.js');
const Statistics = require('../Statistics/Statistics.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();


// Retrieve data
var todayData = dataGetter.getData();

// Tweet the data
twitterBot.tweetCovidText(todayData);