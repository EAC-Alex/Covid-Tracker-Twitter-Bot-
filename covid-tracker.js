// Class import

const TwitterBot = require('./TwitterBot.js');
const DataGetter = require('./DataGetter.js');

// Schedule main function

var schedule = require('node-schedule');
var everyDayPlanner = schedule.scheduleJob('0 24 23 * * *', main);

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

main();