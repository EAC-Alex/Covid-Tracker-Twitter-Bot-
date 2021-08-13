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
        // Get the csv data in an array
        const vaccinationsDataArray = csv.parse(rawHttpData);

        // Take the last and the before last vaccination data
        const [data_date, total_vaccinations, people_vaccinated, people_fully_vaccinated, vaccine, location, source_url, total_boosters] = vaccinationsDataArray[vaccinationsDataArray.length - 1];
        var lastVaccinationData = {data_date, total_vaccinations, people_vaccinated, people_fully_vaccinated, vaccine, location, source_url, total_boosters};
        const [data_date2, total_vaccinations2, people_vaccinated2, people_fully_vaccinated2, vaccine2, location2, source_url2, total_boosters2] = vaccinationsDataArray[vaccinationsDataArray.length - 2];
        var beforeLastVaccinationData = {total_vaccinations2, people_vaccinated2, people_fully_vaccinated2};

        // Add new data to the last vaccination data
        lastVaccinationData.data_date =  this.vaccinationsDataSourceDate(lastVaccinationData.data_date);
        lastVaccinationData.total_vaccinations_increase = lastVaccinationData.total_vaccinations - beforeLastVaccinationData.total_vaccinations2;
        lastVaccinationData.people_vaccinated_increase = lastVaccinationData.people_vaccinated - beforeLastVaccinationData.people_fully_vaccinated2;
        lastVaccinationData.people_fully_vaccinated_increase = lastVaccinationData.people_fully_vaccinated - beforeLastVaccinationData.people_fully_vaccinated2;

        return lastVaccinationData;
    }

    // Date of worldometers data is yesterday
    worldometersSourceDate() {
        var todayDate = new Date();

        todayDate.setDate(todayDate.getDate() - 1);
        return todayDate;
    }

    // Date of vaccinations data changes, we've got to find it in a specific column of the row and format it for the program
    vaccinationsDataSourceDate(date) {
        return new Date(date);
    }

}



module.exports = dataGetter;