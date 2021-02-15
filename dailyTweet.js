// Class import
const TwitterBot = require('./TwitterBot.js');
const DataGetter = require('./DataGetter.js');
const StatisticsManager = require('./StatisticsManager.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();
let statisticsManager = new StatisticsManager();


// Update and retrieve data
dataGetter.updateData();
var dataCovid = dataGetter.getData();

// Tweet the data
twitterBot.tweetText(dataCovid);

// Add the data to the statistics in the database
statisticsManager.addStatistic(dataCovid);