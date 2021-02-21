// Class import
const TwitterBot = require('../TwitterBot/TwitterBot.js');
const DataGetter = require('../Data/DataGetter.js');
const StatisticsManager = require('../Statistics/StatisticsManager.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();
let statisticsManager = new StatisticsManager();


// Update and retrieve data
dataGetter.updateData();
var dataCovid = dataGetter.getData();

// Tweet the data
twitterBot.tweetVaccinationsText(dataCovid);

// Add the data to the statistics in the database
statisticsManager.addStatistic(dataCovid);