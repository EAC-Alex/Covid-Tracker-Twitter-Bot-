// Class import
const TwitterBot = require('./TwitterBot.js');
const DataGetter = require('./DataGetter.js');
const ChartManager = require('./ChartManager.js');

// utils function import
const getFormattedDate = require('./utils/getFormattedDate.js');
const sleep = require('./utils/sleep.js');

// Objects instanciation
let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();
let chartManager = new ChartManager();

// Update and retrieve data
dataGetter.updateData();
var dataCovid = dataGetter.getData();

// Create the statistics chart and download it locally
chartManager.createChart();
chartManager.downloadChart().then(async () => {

    // Wait 5 seconds for the statistics chart to be written on the file system
    await sleep(5000);
    // Tweet the statistics chart
    var date = getFormattedDate();
    twitterBot.tweetMedia(`chart_${date}.png`);

});