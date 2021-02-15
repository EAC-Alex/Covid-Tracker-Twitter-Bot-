const DatabaseManager = require('./DatabaseManager.js');


class StatisticsManager {

    constructor() {
        this.databaseManager = new DatabaseManager();
    }

    addStatistic(dataCovid) {
        var actualDate = new Date();
        actualDate.setHours(actualDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)

        const statistics = {
            date: actualDate,
            data: dataCovid
        }
        this.databaseManager.insertValue("belgium-covid-tracker", "statistics", statistics);
    }

    getWeekDocuments() {
        var todayDate = new Date();
        todayDate.setHours(todayDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)
        var lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);
        lastWeekDate.setHours(lastWeekDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)
        var weekDocuments = this.databaseManager.getAllDocumentsBetweenDates("belgium-covid-tracker", "statistics", lastWeekDate, todayDate)
        return weekDocuments;
    }

    async getWeekStatistics(statisticType) {
        return await new Promise(async (resolve, reject) => {
            var weekStatistics = [];
            var weekDocuments = await this.getWeekDocuments();
            weekDocuments.forEach(statistic => {
                var statisticString = statistic.data[statisticType].slice(1).replace(',', ".");
                var statisticFloat = parseFloat(statisticString);
                weekStatistics.push(statisticFloat);
            })
            resolve(weekStatistics);
        })
    }
}

module.exports = StatisticsManager;