const DatabaseManager = require('./DatabaseManager.js');


class StatisticsManager {

    constructor() {
        this.databaseManager = new DatabaseManager();
    }

    addStatistic(dataCovid) {

        this.databaseManager.connect().then(() => {

            const statistics = {
                date: new Date(),
                data: dataCovid
            }
            databaseManager.insertValue("belgium-covid-tracker", "statistics", statistics);

        }, (err) => { console.log(err) })

        this.databaseManager.disconnect();
    }

    getWeekStatistics() {
        this.databaseManager.connect().then(() => {

            var todayDate = new Date();
            var lastWeekDate = new Date();
            lastWeekDate.setDate(lastWeekDate.getDate() - 7);

            this.databaseManager.getAllDocumentsBetweenDates("belgium-covid-tracker", "statistics", lastWeekDate, todayDate);

        }, (err) => { console.log(err) })

        this.databaseManager.disconnect();
    }
}

module.exports = StatisticsManager;