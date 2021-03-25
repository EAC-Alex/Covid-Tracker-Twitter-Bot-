const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const csv = require('csv-string');


class dataGetter {

    worldometersData;
    vaccinationsData;

    constructor() { }

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
        var lastVaccinationData = vaccinationsDataArray[vaccinationsDataArray.length - 1];
        var beforeLastVaccinationData = vaccinationsDataArray[vaccinationsDataArray.length - 2];

        // Hardcoded structure of csv data
        var lastVaccinationData = {
            location: lastVaccinationData[0],
            date: lastVaccinationData[1],
            vaccine_name: lastVaccinationData[2],

            total_vaccinations: lastVaccinationData[4],
            total_vaccinations_increase: lastVaccinationData[4] - beforeLastVaccinationData[4],

            people_vaccinated: lastVaccinationData[5],
            people_vaccinated_increase: lastVaccinationData[5] - beforeLastVaccinationData[5],

            people_fully_vaccinated: lastVaccinationData[6],
            people_fully_vaccinated_increase: lastVaccinationData[6] - beforeLastVaccinationData[6]
        }

        return lastVaccinationData;

    }

    getData() {
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

}



module.exports = dataGetter;