const DatabaseManager = require('./DBconnection.js');


class Statistics {

    constructor() {
        this.databaseManager = new DatabaseManager();
    }

    add(dataCovid) {
        var actualDate = new Date();
        actualDate.setHours(actualDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)

        const statistics = {
            date: actualDate,
            data: dataCovid
        }
        this.databaseManager.insert("belgium-covid-tracker", "statistics", statistics);
    }

    async get(statisticType, numberOfStatsFromNow) {
        return await new Promise(async (resolve, reject) => {
            var todayDate = new Date();
            var lastWeekDate = new Date();
            lastWeekDate.setDate(lastWeekDate.getDate() - numberOfStatsFromNow);

            var statistics = [];
            var documents = await this.databaseManager.getDocuments("belgium-covid-tracker", "statistics", lastWeekDate, todayDate);
            console.log(documents)
            documents.forEach(statistic => {
                var statisticString = statistic.data.covid_stats[statisticType].slice(1).replace(',', ".");
                var statisticFloat = parseFloat(statisticString);
                statistics.push(statisticFloat);
            })
            resolve(statistics);
        })
    }
}

module.exports = Statistics;