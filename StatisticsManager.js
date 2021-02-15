const DatabaseManager = require('./DatabaseManager.js');


class StatisticsManager {

    constructor() {
        this.databaseManager = new DatabaseManager();
    }

    addStatistic(dataCovid) {
        const statistics = {
            date: new Date(),
            data: dataCovid
        }
        databaseManager.insertValue("belgium-covid-tracker", "statistics", statistics);
    }

    getWeekStatistics() {
        var todayDate = new Date();
        var lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);
        var weekStatistics = this.databaseManager.getAllDocumentsBetweenDates("belgium-covid-tracker", "statistics", lastWeekDate, todayDate)
        return weekStatistics;
    }
}

module.exports = StatisticsManager;