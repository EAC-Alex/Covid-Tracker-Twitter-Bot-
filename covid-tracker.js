// Class import

const TwitterBot = require('./TwitterBot.js');
const DataGetter = require('./DataGetter.js');

var schedule = require('node-schedule');
var everyDayPlanner = schedule.scheduleJob('0 0 10 * * *', main);

// Objects instanciation

let twitterBot = new TwitterBot();
let dataGetter = new DataGetter();

// Main

function main() {
    dataGetter.updateData();

    values = {
        totalCases : dataGetter.getData_totalCases(),
        newCases : dataGetter.getData_newCases(),
        totalDeaths: dataGetter.getData_totalDeaths(),
        newDeaths : dataGetter.getData_newDeaths()
    }

    twitterBot.tweet(values);
}