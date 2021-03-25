// Class import
const TwitterBot = require('../TwitterBot/TwitterBot.js');
const Statistics = require('../Statistics/Statistics.js');
const Charts = require('../Statistics/Charts.js');

// utils function import
const getFormattedDate = require('../utils/getFormattedDate.js');
const sleep = require('../utils/sleep.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let statistics = new Statistics();
let charts = new Charts();

// Get week statistics
statistics.get("vaccinations_stats", "total_vaccinations_increase", 7)
    .then((weekStatistics => {
        // Create the statistics chart and download it locally
        charts.create("Nombre de doses administrés", weekStatistics);
        charts.download();
    })).then(async () => {
        // Wait 5 seconds for the statistics chart to be written on the file system
        await sleep(5000);
        // Tweet the statistics chart
        var date = getFormattedDate(new Date());
        twitterBot.tweetMedia(`../chart_${date}.png`, 'Graphe sur le nombre de nouveaux cas recensé cette semaine');
    })