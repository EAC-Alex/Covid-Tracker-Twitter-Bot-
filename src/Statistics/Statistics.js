const DBconnection = require('./DBconnection.js');


class Statistics {

    constructor() {
        this.DBconnection = new DBconnection();
    }

    add(dataCovid) {
        var actualDate = new Date();
        actualDate.setHours(actualDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)

        const statistics = {
            date: actualDate,
            data: dataCovid
        }
        this.DBconnection.insert("belgium-covid-tracker", "statistics", statistics);
    }

    async get(statisticType, statisticName , numberOfStatsFromNow) {
        return await new Promise(async (resolve, reject) => {
            var todayDate = new Date();
            var lastWeekDate = new Date();
            lastWeekDate.setDate(lastWeekDate.getDate() - numberOfStatsFromNow);

            var statistics = [];
            var documents = await this.DBconnection.getDocuments("belgium-covid-tracker", "statistics", lastWeekDate, todayDate);
            console.log(documents)
            documents.forEach(statistic => {
                var statisticString = statistic.data[statisticType][statisticName].slice(1).replace(',', ".");
                var statisticFloat = parseFloat(statisticString);
                statistics.push(statisticFloat);
            })
            resolve(statistics);
        })
    }
}

module.exports = Statistics;