const DBconnection = require('./DBconnection.js');
const getFormattedDate = require('../utils/getFormattedDate.js');


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

    async get(statisticType, statisticName, numberOfStatsFromNow) {
        return await new Promise(async (resolve, reject) => {
            // Calculate the date
            var todayDate = new Date();
            var lastWeekDate = new Date();
            lastWeekDate.setDate(lastWeekDate.getDate() - numberOfStatsFromNow);

            var statistics = [];
            var documents = await this.DBconnection.getDocuments("belgium-covid-tracker", "statistics", lastWeekDate, todayDate);
            documents.forEach(statistic => {
                console.log(statistic)
                var statisticDate = statistic.data[statisticType].data_date;

                // We need to add one day for all of theses statistics because they are based on the previous day
                if (["new_cases", "new_deaths", "total_vaccinations_increase", "people_vaccinated_increase", "people_fully_vaccinated_increase"].includes(statisticName)) {
                    statisticDate.setDate(statisticDate.getDate() - 1);
                }

                var statisticDate = getFormattedDate(statisticDate);


                // new_cases data have particular format in the database
                if (statisticName === "new_cases") {
                    var statisticData = parseFloat(statistic.data[statisticType][statisticName].replace(',', "").replace("+", ""));
                }
                else {
                    var statisticData = parseFloat(statistic.data[statisticType][statisticName]);
                }

                // Push the statistic (with his date and his data) in the list of statistics
                statistics.push({
                    date: statisticDate,
                    data: statisticData
                });
            })
            resolve(statistics);
        })
    }
}

module.exports = Statistics;