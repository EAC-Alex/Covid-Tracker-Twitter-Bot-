const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const csv = require('csv-string');


class dataGetter {

    worldometersData;
    vaccinationsData;

    getData() {
        this.updateData()
        return {
            covid_stats: this.worldometersData,
            vaccinations_stats: this.vaccinationsData
        };
    }

    updateData() {
        //  Worldometers
        var webWorldometersRawData = this.httpGet('https://www.worldometers.info/coronavirus/')
        this.worldometersData = this.parseHttpRequestWorldometersData(webWorldometersRawData);

        // Vaccinations
        var webVaccinationsData = this.httpGet('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Belgium.csv')
        this.vaccinationsData = this.parseHttpRequestVaccinationsData(webVaccinationsData);
    }

    httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    parseHttpRequestWorldometersData(rawHttpData) {
        // regex
        const regexLocateBelgium = /Belgium.*?<\/tr>/si;
        const regexLocateValues = />.*</g;

        // parse data
        var parsedDataBelgium = rawHttpData.match(regexLocateBelgium);
        var parsedDataValues = parsedDataBelgium[0].match(regexLocateValues);

        // format data
        for (var i = 0; i < parsedDataValues.length; i++) {
            // raw value : >123<
            parsedDataValues[i] = parsedDataValues[i].replace('<', '').replace('>', '');
            // formatted value : 123
        }


        var worldometersData = {
            data_date: this.worldometersSourceDate(),
            total_cases: parsedDataValues[1],
            new_cases: parsedDataValues[2] === "" ? null : parsedDataValues[2],
            total_deaths: parsedDataValues[3],
            new_deaths: parsedDataValues[4] === "" ? null : parsedDataValues[4]
        }

        // return data
        return worldometersData;
    }

    parseHttpRequestVaccinationsData(rawHttpData) {
        const vaccinationsDataArray = csv.parse(rawHttpData);
        var lastVaccinationDataRow = vaccinationsDataArray[vaccinationsDataArray.length - 1];
        var beforeLastVaccinationDataRow = vaccinationsDataArray[vaccinationsDataArray.length - 2];

        // Hardcoded structure of csv data
        var lastVaccinationData = {
            location: lastVaccinationDataRow[0],
            data_date: this.vaccinationsDataSourceDate(lastVaccinationDataRow),
            vaccine_name: lastVaccinationDataRow[2],

            total_vaccinations: lastVaccinationDataRow[4],
            total_vaccinations_increase: lastVaccinationDataRow[4] - beforeLastVaccinationDataRow[4],

            people_vaccinated: lastVaccinationDataRow[5],
            people_vaccinated_increase: lastVaccinationDataRow[5] - beforeLastVaccinationDataRow[5],

            people_fully_vaccinated: lastVaccinationDataRow[6],
            people_fully_vaccinated_increase: lastVaccinationDataRow[6] - beforeLastVaccinationDataRow[6]
        }

        return lastVaccinationData;

    }

    // Date of worldometers data is yesterday
    worldometersSourceDate() {
        var todayDate = new Date();

        todayDate.setDate(todayDate.getDate() - 1);
        return todayDate;
    }

    // Date of vaccinations data changes, we've got to find it in a specific column of the row and format it for the program
    vaccinationsDataSourceDate(dataRow) {
        var rawDate = dataRow[1]; // "YYYY-MM-DD"
        return new Date(rawDate);
    }

}



module.exports = dataGetter;