// Class import
const TwitterBot = require('./TwitterBot.js');
const StatisticsManager = require('./StatisticsManager.js');
const ChartManager = require('./ChartManager.js');

// utils function import
const getFormattedDate = require('./utils/getFormattedDate.js');
const sleep = require('./utils/sleep.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let statisticsManager = new StatisticsManager();
let chartManager = new ChartManager();

// Get week statistics
statisticsManager.getWeekStatistics("newCases")
    .then((weekStatistics => {
        // Create the statistics chart and download it locally
        chartManager.createChart("Nombre de nouveaux cas recensés", weekStatistics);
        chartManager.downloadChart();
    })).then(async () => {
        // Wait 5 seconds for the statistics chart to be written on the file system
        await sleep(5000);
        // Tweet the statistics chart
        var date = getFormattedDate();
        twitterBot.tweetMedia(`chart_${date}.png`);
    })