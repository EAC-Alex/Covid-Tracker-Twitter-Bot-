// Class import
const TwitterBot = require('../TwitterBot/TwitterBot.js');
const DataGetter = require('../Data/DataGetter.js');
const DBconnection = require('../Statistics/DBconnection.js');
const Statistics = require('../Statistics/Statistics.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();
let dbConnection = new DBconnection();
let statistics = new Statistics(dbConnection);


// Retrieve data
var dataCovid = dataGetter.getData();

// Tweet the data
twitterBot.tweetVaccinationsText(dataCovid);

// Add the data to the statistics in the database
statistics.add(dataCovid);