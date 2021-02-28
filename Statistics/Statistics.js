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
        this.databaseManager.insertValue("belgium-covid-tracker", "statistics", statistics);
    }

    async get(statisticType) {
        return await new Promise(async (resolve, reject) => {
            var weekStatistics = [];
            var weekDocuments = await this.databaseManager.getWeekDocuments();
            weekDocuments.forEach(statistic => {
                var statisticString = statistic.data[statisticType].slice(1).replace(',', ".");
                var statisticFloat = parseFloat(statisticString);
                weekStatistics.push(statisticFloat);
            })
            resolve(weekStatistics);
        })
    }
}

module.exports = Statistics;