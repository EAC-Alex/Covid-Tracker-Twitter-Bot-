// Class import
const TwitterBot = require('../TwitterBot/TwitterBot.js');
const DataGetter = require('../Data/DataGetter.js');
const Statistics = require('../Statistics/Statistics.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();
let statistics = new Statistics();


// Update and retrieve data
dataGetter.updateData();
var dataCovid = dataGetter.getData();

// Tweet the data
twitterBot.tweetVaccinationsText(dataCovid);