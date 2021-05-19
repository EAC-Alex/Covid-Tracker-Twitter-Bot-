// Class import
const TwitterBot = require('../TwitterBot/TwitterBot.js');
const DataGetter = require('../Data/DataGetter.js');
const DBconnection = require('../DBconnection/DBconnection.js');
const Statistics = require('../Statistics/Statistics.js');

// utils function import
const isSameDay = require('../utils/isSameDay.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();
let dbConnection = new DBconnection();
let statistics = new Statistics(dbConnection);

// Script
(async () => {

    // Connection to the database
    dbConnection.connect()


    // We check if the date source of the data is not the same as the data recorded to not tweet something already tweeted
    var todayData = dataGetter.getData();
    var lastDataRecorded = await dbConnection.getLastDocument("belgium-covid-tracker", "statistics");

    if (!isSameDay(todayData.vaccinations_stats.data_date, lastDataRecorded.data.vaccinations_stats.data_date)) {
        // Tweet the data
        twitterBot.tweetVaccinationsText(todayData);
        // Add the data to the statistics in the database
        statistics.add(todayData);
    }


    // Disconnection to the database
    dbConnection.disconnect();
    
})();